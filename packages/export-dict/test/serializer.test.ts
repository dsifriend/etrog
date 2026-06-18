import { describe, expect, test } from "bun:test";
import type { LanguageTag, Lexicon, URI } from "@etrog/core";
import { LexInfoPoS, langString } from "@etrog/core";
import { decodeDictBase64Integer, serializeDict } from "../src/serializer.js";

interface ParsedIndexRow {
	headword: string;
	offset: number;
	length: number;
}

/** Parses DICT .index content into decoded offsets and lengths. */
function parseIndex(indexText: string): ParsedIndexRow[] {
	return indexText
		.split("\n")
		.filter((line) => line.length > 0)
		.map((line) => {
			const [headword, offsetB64, lengthB64] = line.split("\t");
			if (!headword || !offsetB64 || !lengthB64) {
				throw new Error(`Invalid index line: ${line}`);
			}

			return {
				headword,
				offset: decodeDictBase64Integer(offsetB64),
				length: decodeDictBase64Integer(lengthB64),
			};
		});
}

/** Looks up a headword's definition block using decoded index offsets. */
function lookupDefinition(
	indexRows: ParsedIndexRow[],
	dictText: string,
	headword: string,
): string {
	const row = indexRows.find((candidate) => candidate.headword === headword);
	if (!row) {
		throw new Error(`Headword not found in index: ${headword}`);
	}

	const dictBytes = new TextEncoder().encode(dictText);
	const blockBytes = dictBytes.slice(row.offset, row.offset + row.length);
	return new TextDecoder().decode(blockBytes).trimEnd();
}

describe("serializeDict", () => {
	test("generates .index/.dict and resolves a known headword definition", async () => {
		const lexicon = {
			"@id": "urn:uuid:lex-en" as URI,
			"@type": "lime:Lexicon",
			"lime:language": "en" as LanguageTag,
			"lime:entry": [
				{
					"@id": "urn:uuid:entry-dog" as URI,
					"@type": "ontolex:LexicalEntry",
					"lime:language": "en" as LanguageTag,
					"lexinfo:partOfSpeech": [LexInfoPoS.noun],
					"ontolex:canonicalForm": {
						"@id": "urn:uuid:form-dog" as URI,
						"@type": "ontolex:Form",
						"ontolex:writtenRep": [langString("dog", "en" as LanguageTag)],
						"ontolex:phoneticRep": [langString("dɔɡ", "en" as LanguageTag)],
					},
					"ontolex:sense": [
						{
							"@id": "urn:uuid:sense-dog-1" as URI,
							"@type": "ontolex:LexicalSense",
							"skos:definition": [
								langString(
									"A domesticated carnivorous mammal often kept as a pet.",
									"en" as LanguageTag,
								),
							],
							"vartrans:senseRel": [
								{
									"@id": "urn:uuid:rel-dog-canine" as URI,
									"@type": "vartrans:SenseRelation",
									"vartrans:target": "urn:uuid:sense-canine-1" as URI,
								},
							],
						},
					],
				},
				{
					"@id": "urn:uuid:entry-canine" as URI,
					"@type": "ontolex:LexicalEntry",
					"lime:language": "en" as LanguageTag,
					"lexinfo:partOfSpeech": [LexInfoPoS.noun],
					"ontolex:canonicalForm": {
						"@id": "urn:uuid:form-canine" as URI,
						"@type": "ontolex:Form",
						"ontolex:writtenRep": [langString("canine", "en" as LanguageTag)],
					},
					"ontolex:sense": [
						{
							"@id": "urn:uuid:sense-canine-1" as URI,
							"@type": "ontolex:LexicalSense",
							"skos:definition": [
								langString(
									"A member of the biological family Canidae.",
									"en" as LanguageTag,
								),
							],
						},
					],
				},
			],
		} satisfies Lexicon;

		const result = serializeDict(lexicon);
		const parsedIndex = parseIndex(result.index);
		const dogDefinition = lookupDefinition(parsedIndex, result.dict, "dog");

		expect(dogDefinition).toContain(
			"A domesticated carnivorous mammal often kept as a pet.",
		);
		expect(dogDefinition).toContain("Phonetic representation: dɔɡ");
		expect(dogDefinition).toContain("{see also: canine}");
	});

	test("uses lexicon language fallback when requested language is absent", () => {
		const lexicon = {
			"@id": "urn:uuid:lex-simple" as URI,
			"@type": "lime:Lexicon",
			"lime:language": "en" as LanguageTag,
			"lime:entry": [
				{
					"@id": "urn:uuid:entry-house" as URI,
					"@type": "ontolex:LexicalEntry",
					"lime:language": "en" as LanguageTag,
					"ontolex:canonicalForm": {
						"@id": "urn:uuid:form-house" as URI,
						"@type": "ontolex:Form",
						"ontolex:writtenRep": [langString("house", "en" as LanguageTag)],
					},
					"ontolex:sense": [
						{
							"@id": "urn:uuid:sense-house-1" as URI,
							"@type": "ontolex:LexicalSense",
							"skos:definition": [
								langString(
									"A building for human habitation.",
									"en" as LanguageTag,
								),
							],
						},
					],
				},
			],
		} satisfies Lexicon;

		const result = serializeDict(lexicon, { language: "fr" as LanguageTag });
		const parsedIndex = parseIndex(result.index);
		const definition = lookupDefinition(parsedIndex, result.dict, "house");

		expect(definition).toContain("A building for human habitation.");
	});
});
