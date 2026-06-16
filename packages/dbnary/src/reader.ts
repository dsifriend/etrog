import type { Lexicon } from "@etrog/core";
import { datasetToLexicon, parseTurtle } from "@etrog/rdf";

/**
 * Loads a DBnary Turtle dump and converts it to an Etrog `Lexicon`.
 *
 * @param input - Turtle text or a readable stream containing Turtle.
 * @param baseIri - Optional base IRI for resolving relative IRIs in Turtle.
 * @returns The parsed Etrog `Lexicon`.
 *
 * @example
 * const turtle = await Bun.file("./dbnary-en.ttl").text();
 * const lexicon = await readDbnaryTurtle(turtle);
 */
export async function readDbnaryTurtle(
	input: string | ReadableStream,
	baseIri?: string,
): Promise<Lexicon> {
	const dataset = await parseTurtle(input, baseIri);
	return datasetToLexicon(dataset);
}
