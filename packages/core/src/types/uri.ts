import type { URI } from "./index.js";

/**
 * Etrog's project-specific namespace UUID, used as a stable seed for UUIDv5
 * generation. This is a randomly generated UUIDv4 allocated once for this
 * project; it scopes all minted URNs to the Etrog namespace.
 * Value: urn:uuid:96f16397-6054-4c94-8ef6-c01603f158cc
 */
export const ETROG_NS_UUID: URI =
	"urn:uuid:96f16397-6054-4c94-8ef6-c01603f158cc" as URI;

/**
 * Parses a UUID string (with hyphens) into a 16-byte Uint8Array.
 * @param uuid - The UUID string to parse.
 * @returns A 16-byte Uint8Array.
 */
function uuidToBytes(uuid: string): Uint8Array {
	const hex = uuid.replace(/-/g, "");
	const bytes = new Uint8Array(16);
	for (let i = 0; i < 16; i++) {
		bytes[i] = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16);
	}
	return bytes;
}

/** Matches a canonical UUID string with hyphens. */
const UUID_PATTERN =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Extracts and validates the UUID component from a `urn:uuid:` namespace URI.
 * @param namespace - The namespace URI.
 * @returns The lowercase UUID component.
 */
function extractNamespaceUuid(namespace: URI): string {
	const prefix = "urn:uuid:";
	if (!namespace.startsWith(prefix)) {
		throw new TypeError(
			`Invalid namespace URI: expected 'urn:uuid:' prefix, received '${namespace}'.`,
		);
	}

	const uuid = namespace.slice(prefix.length).toLowerCase();
	if (!UUID_PATTERN.test(uuid)) {
		throw new TypeError(
			`Invalid namespace URI: expected UUID after 'urn:uuid:', received '${namespace}'.`,
		);
	}

	return uuid;
}

/**
 * Formats a 16-byte array as a UUID string (lowercase, with hyphens).
 * @param bytes - The 16-byte array.
 * @returns A UUID string.
 */
function bytesToUuid(bytes: Uint8Array): string {
	const hex = Array.from(bytes)
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
	return [
		hex.slice(0, 8),
		hex.slice(8, 12),
		hex.slice(12, 16),
		hex.slice(16, 20),
		hex.slice(20),
	].join("-");
}

/**
 * Generates a `urn:uuid:` URN using the UUIDv5 algorithm (SHA-1).
 *
 * @param namespace - A URI used as the namespace seed (typically `ETROG_NS_UUID`,
 *   Etrog's project-specific UUIDv4 namespace).
 * @param localPart - The local name to hash together with the namespace.
 * @returns A `urn:uuid:` URN derived from the SHA-1 of `namespace + localPart`.
 * @throws `TypeError` when `namespace` is not a canonical `urn:uuid:<uuid>` URI.
 *
 * @example
 * const uri = await mintURI(ETROG_NS_UUID, "my-entry");
 * // => "urn:uuid:xxxxxxxx-xxxx-5xxx-yxxx-xxxxxxxxxxxx"
 */
export async function mintURI(namespace: URI, localPart: string): Promise<URI> {
	const nsBytes = uuidToBytes(extractNamespaceUuid(namespace));
	const nameBytes = new TextEncoder().encode(localPart);

	const combined = new Uint8Array(nsBytes.length + nameBytes.length);
	combined.set(nsBytes, 0);
	combined.set(nameBytes, nsBytes.length);

	const hashBuffer = await crypto.subtle.digest("SHA-1", combined);
	const hash = new Uint8Array(hashBuffer);

	// Set version = 5 (bits 76-79 of octet 6 = 0101)
	hash[6] = (hash[6] & 0x0f) | 0x50;
	// Set variant = RFC 4122 (bits 6-7 of octet 8 = 10)
	hash[8] = (hash[8] & 0x3f) | 0x80;

	return `urn:uuid:${bytesToUuid(hash.slice(0, 16))}` as URI;
}

/**
 * Constructs an HTTP(S) IRI by appending a URL-encoded local part to a base IRI.
 *
 * @param baseIri - The base IRI string (e.g. `"https://example.org/lexicon/"`).
 * @param localPart - The local name to encode and append.
 * @returns The concatenated IRI cast to `URI`.
 *
 * @example
 * const uri = mintIRI("https://example.org/lexicon/", "café");
 * // => "https://example.org/lexicon/caf%C3%A9"
 */
export function mintIRI(baseIri: string, localPart: string): URI {
	const separator = baseIri.endsWith("/") || baseIri.endsWith("#") ? "" : "/";
	return `${baseIri}${separator}${encodeURIComponent(localPart)}` as URI;
}
