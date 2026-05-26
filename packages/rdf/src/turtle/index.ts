import * as N3 from "n3";
import type { EtrogDataset, NamespaceMap } from "../types.js";

/**
 * Parses a Turtle document into an `EtrogDataset`.
 *
 * @param input - A Turtle string or a `ReadableStream` of Turtle text.
 * @param baseIri - Optional base IRI for resolving relative IRIs.
 * @returns A promise resolving to the parsed dataset.
 *
 * @example
 * const dataset = await parseTurtle(`
 *   @prefix ex: <https://example.org/> .
 *   ex:entry a <http://www.w3.org/ns/lemon/ontolex#LexicalEntry> .
 * `);
 */
export async function parseTurtle(
	input: string | ReadableStream,
	baseIri?: string,
): Promise<EtrogDataset> {
	const text = typeof input === "string" ? input : await streamToString(input);

	return new Promise((resolve, reject) => {
		const store = new N3.Store();
		const parser = new N3.Parser({ baseIRI: baseIri, format: "Turtle" });
		parser.parse(text, (error, quad, _prefixes) => {
			if (error) {
				reject(error);
			} else if (quad) {
				store.add(quad);
			} else {
				// null quad signals end of stream
				resolve({ store });
			}
		});
	});
}

/**
 * Serializes an `EtrogDataset` to a Turtle string.
 *
 * @param dataset - The dataset to serialize.
 * @param prefixes - Optional prefix map to include in the Turtle output.
 * @returns A promise resolving to the Turtle string.
 *
 * @example
 * const turtle = await serializeTurtle(dataset, { ex: "https://example.org/" });
 */
export async function serializeTurtle(
	dataset: EtrogDataset,
	prefixes?: NamespaceMap,
): Promise<string> {
	return new Promise((resolve, reject) => {
		const chunks: string[] = [];
		const writer = new N3.Writer({ prefixes: prefixes ?? {} });
		for (const quad of dataset.store) {
			writer.addQuad(quad);
		}
		writer.end((error, result) => {
			if (error) {
				reject(error);
			} else {
				resolve(result ?? chunks.join(""));
			}
		});
	});
}

/** Reads a `ReadableStream` of text into a single string. */
async function streamToString(stream: ReadableStream): Promise<string> {
	const reader = stream.getReader();
	const decoder = new TextDecoder();
	const parts: string[] = [];
	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		parts.push(typeof value === "string" ? value : decoder.decode(value));
	}
	return parts.join("");
}
