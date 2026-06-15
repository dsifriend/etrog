import type { Lexicon } from "@etrog/core";
import { datasetToLexicon, parseTurtle } from "@etrog/rdf";

/**
 * Loads an OEWN Turtle dump and converts it to an Etrog `Lexicon`.
 *
 * @param input - Turtle text or a readable stream containing Turtle.
 * @param baseIri - Optional base IRI for resolving relative IRIs in Turtle.
 * @returns The parsed Etrog `Lexicon`.
 *
 * @example
 * const turtle = await Bun.file("./oewn.ttl").text();
 * const lexicon = await readOewnTurtle(turtle);
 */
export async function readOewnTurtle(
	input: string | ReadableStream,
	baseIri?: string,
): Promise<Lexicon> {
	const dataset = await parseTurtle(input, baseIri);
	return datasetToLexicon(dataset);
}
