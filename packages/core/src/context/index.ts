import { DEFAULT_CONTEXT } from "../namespaces.js";
import type { JsonLdContext } from "../types/index.js";

/**
 * Builds a JSON-LD context by merging `DEFAULT_CONTEXT` with optional extra entries.
 *
 * @param extra - Additional context entries to merge in (override defaults on conflict).
 * @returns A merged `@context` object.
 *
 * @example
 * const ctx = buildContext({ myPrefix: "https://example.org/" });
 */
export function buildContext(extra?: JsonLdContext): JsonLdContext {
	const base = DEFAULT_CONTEXT["@context"] as Record<string, unknown>;
	return {
		"@context": {
			...base,
			...(extra ?? {}),
		},
	};
}

/**
 * Stub for JSON-LD compaction — requires `@etrog/rdf` to function.
 *
 * @param _doc - The JSON-LD document to compact.
 * @param _context - The context to compact against.
 * @returns Never returns; always throws.
 *
 * @throws Always throws an error directing the caller to install `@etrog/rdf`.
 */
export function compact(_doc: unknown, _context?: JsonLdContext): never {
	throw new Error("compact() requires @etrog/rdf — install that package");
}
