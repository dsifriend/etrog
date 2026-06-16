import type { Lexicon, NamespacePrefix } from "@etrog/core";
import { DEFAULT_CONTEXT, Namespaces } from "@etrog/core";
import jsonld from "jsonld";
import * as N3 from "n3";
import type { EtrogDataset } from "../types.js";

// Minimal type shim for the jsonld default export
interface JsonLdLib {
	toRDF(doc: object, options?: { format?: string }): Promise<unknown>;
	fromRDF(input: string, options?: { format?: string }): Promise<object[]>;
	compact(doc: object, context: object): Promise<object>;
	frame(doc: object, frame: object): Promise<object>;
}

const lib = jsonld as unknown as JsonLdLib;

/**
 * Converts a `Lexicon` (JSON-LD compacted form) to an `EtrogDataset` (N3 Store).
 *
 * Internally expands the lexicon to N-Quads via `jsonld.toRDF()`, then loads
 * those quads into an N3 Store.
 *
 * @param lexicon - The `Lexicon` object to convert.
 * @returns A promise resolving to the equivalent `EtrogDataset`.
 *
 * @example
 * const dataset = await lexiconToDataset(lexicon);
 */
export async function lexiconToDataset(
	lexicon: Lexicon,
): Promise<EtrogDataset> {
	// Ensure there is a context so jsonld can resolve prefixed names
	const doc: Record<string, unknown> = {
		...DEFAULT_CONTEXT,
		...(lexicon as unknown as Record<string, unknown>),
	};

	const nquads = (await lib.toRDF(doc, {
		format: "application/n-quads",
	})) as string;

	const store = new N3.Store();
	if (nquads && nquads.trim().length > 0) {
		const parser = new N3.Parser({ format: "N-Quads" });
		store.addQuads(parser.parse(nquads));
	}
	return { store };
}

/**
 * Converts an `EtrogDataset` (N3 Store) back to a `Lexicon` by serializing
 * to N-Quads, loading into `jsonld.fromRDF()`, then framing with a Lexicon
 * frame that embeds the entire nested structure (entries, forms, senses, etc.).
 *
 * Uses JSON-LD framing to ensure the result is a single Lexicon root object
 * with all related resources (entries, forms, senses) embedded rather than
 * returned as a `@graph` array.
 *
 * @param dataset - The `EtrogDataset` to convert.
 * @returns A promise resolving to a `Lexicon`-shaped object.
 *
 * @example
 * const lexicon = await datasetToLexicon(dataset);
 */
export async function datasetToLexicon(
	dataset: EtrogDataset,
): Promise<Lexicon> {
	const nquads = await storeToNQuads(dataset.store);
	const expanded = await lib.fromRDF(nquads, { format: "application/n-quads" });

	// Define a frame that shapes the output as a Lexicon with nested structure.
	// The frame uses full URIs (no context) to avoid property aliasing.
	// We'll compact it afterward to get the prefixed property names that match
	// what the builders produce.
	const frame = {
		"@type": `${Namespaces.lime}Lexicon`,
		[`${Namespaces.lime}entry`]: {
			"@embed": "@always",
			[`${Namespaces.ontolex}canonicalForm`]: {
				"@embed": "@always",
			},
			[`${Namespaces.ontolex}otherForm`]: { "@embed": "@always" },
			[`${Namespaces.ontolex}sense`]: { "@embed": "@always" },
			[`${Namespaces.decomp}constituent`]: { "@embed": "@always" },
		},
	};

	const framed = await lib.frame(expanded, frame);

	// Compact the framed result to convert full URIs to prefixed property names.
	// Use a context that ONLY defines the prefixes, not the shorthand aliases,
	// to ensure we get "lime:language" instead of "language", etc.
	const prefixOnlyContext = {
		"@context": Namespaces as Record<NamespacePrefix, string>,
	};

	const compacted = (await lib.compact(framed, prefixOnlyContext)) as Record<
		string,
		unknown
	>;

	// Remove the @context from the result since it's redundant
	const { "@context": _context, ...withoutContext } = compacted;
	return withoutContext as unknown as Lexicon;
}

/** Serializes an N3 Store to an N-Quads string. */
function storeToNQuads(store: N3.Store): Promise<string> {
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
