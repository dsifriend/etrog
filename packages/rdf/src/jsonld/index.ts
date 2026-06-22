import jsonld from "jsonld";
import * as N3 from "n3";
import type { EtrogDataset } from "../types.js";

/**
 * Parses a JSON-LD document into an `EtrogDataset`.
 *
 * @param input - A JSON-LD document object or JSON string.
 * @param context - Optional context to apply before parsing.
 * @returns A promise resolving to the parsed dataset.
 *
 * @example
 * const dataset = await parseJsonLd({ "@id": "https://example.org/lex", "@type": "lime:Lexicon" });
 */
export async function parseJsonLd(
	input: object | string,
	context?: object,
): Promise<EtrogDataset> {
	const doc = typeof input === "string" ? (JSON.parse(input) as object) : input;
	const docWithContext = context
		? { "@context": context, ...(doc as Record<string, unknown>) }
		: doc;

	// toRDF returns an object with named graphs; cast through unknown for jsonld types
	const nquads = (await (jsonld as unknown as JsonLdLib).toRDF(docWithContext, {
		format: "application/n-quads",
	})) as string;

	return parseNQuads(nquads);
}

/**
 * Serializes an `EtrogDataset` to a compacted JSON-LD object.
 *
 * @param dataset - The dataset to serialize.
 * @param context - Optional context to compact against. Defaults to a minimal `@vocab` context.
 * @returns A promise resolving to the compacted JSON-LD object.
 *
 * @example
 * const doc = await serializeJsonLd(dataset, { "@vocab": "https://example.org/" });
 */
export async function serializeJsonLd(
	dataset: EtrogDataset,
	context?: object,
): Promise<object> {
	const nquads = await storeToNQuads(dataset.store);
	const lib = jsonld as unknown as JsonLdLib;
	const expanded = await lib.fromRDF(nquads, { format: "application/n-quads" });
	if (!context) {
		return expanded;
	}
	return lib.compact(expanded, context);
}

/**
 * Expands a JSON-LD document to its expanded form.
 *
 * @param doc - The JSON-LD document to expand.
 * @returns A promise resolving to an array of expanded JSON-LD nodes.
 *
 * @example
 * const expanded = await expand({ "@context": { ex: "https://example.org/" }, "@id": "ex:foo" });
 */
export async function expand(doc: object): Promise<object[]> {
	return (jsonld as unknown as JsonLdLib).expand(doc);
}

/**
 * Compacts a JSON-LD document using the given context.
 *
 * @param doc - The JSON-LD document to compact.
 * @param context - The context to compact against.
 * @returns A promise resolving to the compacted JSON-LD document.
 *
 * @example
 * const compacted = await compact(expanded, { "@vocab": "https://example.org/" });
 */
export async function compact(doc: object, context: object): Promise<object> {
	return (jsonld as unknown as JsonLdLib).compact(doc, context);
}

/**
 * Frames a JSON-LD document using the given frame.
 *
 * @param doc - The JSON-LD document to frame.
 * @param frameDoc - The JSON-LD frame to apply.
 * @returns A promise resolving to the framed JSON-LD document.
 *
 * @example
 * const framed = await frame(doc, { "@type": "lime:Lexicon" });
 */
export async function frame(doc: object, frameDoc: object): Promise<object> {
	return (jsonld as unknown as JsonLdLib).frame(doc, frameDoc);
}

/** Serializes an N3 Store to an N-Quads string. */
async function storeToNQuads(store: N3.Store): Promise<string> {
	return new Promise((resolve, reject) => {
		const writer = new N3.Writer({ format: "N-Quads" });
		for (const quad of store) {
			writer.addQuad(quad);
		}
		writer.end((err, result) => {
			if (err) reject(err);
			else resolve(result ?? "");
		});
	});
}

/** Parses an N-Quads string into an `EtrogDataset`. */
function parseNQuads(nquads: string): EtrogDataset {
	const store = new N3.Store();
	const parser = new N3.Parser({ format: "N-Quads" });
	const quads = parser.parse(nquads);
	store.addQuads(quads);
	return { store };
}

/**
 * Minimal type shim for the `jsonld` default export.
 * The `@types/jsonld` package uses a different module shape from the CJS export.
 */
interface JsonLdLib {
	toRDF(doc: object, options?: { format?: string }): Promise<unknown>;
	fromRDF(input: string, options?: { format?: string }): Promise<object[]>;
	compact(doc: object, context: object): Promise<object>;
	expand(doc: object): Promise<object[]>;
	frame(doc: object, frame: object): Promise<object>;
}
