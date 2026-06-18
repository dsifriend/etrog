import { describe, expect, test } from "bun:test";
import type { LanguageTag, LexicalSense, Lexicon, URI } from "@etrog/core";
import { LexInfoPoS, LexInfoRegister, langString } from "@etrog/core";
import { SaxesParser } from "@rubensworks/saxes";
import { serializeAppleDictionaryXml } from "../src/serializer.js";

interface ParsedXmlSummary {
	dEntryCount: number;
	dIndexValues: string[];
	headwords: string[];
	hasPartOfSpeech: boolean;
	hasPronunciation: boolean;
	hasDefinition: boolean;
	hasExample: boolean;
	hasTranslation: boolean;
	hasParentalControl: boolean;
	entryTitleValues: string[];
}

/** Parses XML with SAX and gathers element/attribute evidence for assertions. */
function parseAppleXml(xml: string): ParsedXmlSummary {
	const summary: ParsedXmlSummary = {
		dEntryCount: 0,
		dIndexValues: [],
		headwords: [],
		hasPartOfSpeech: false,
		hasPronunciation: false,
		hasDefinition: false,
		hasExample: false,
		hasTranslation: false,
		hasParentalControl: false,
		entryTitleValues: [],
	};

	const textStack: string[] = [];
	const parser = new SaxesParser({ xmlns: true });

	parser.on("error", (error) => {
		throw error;
	});

	parser.on("opentag", (tag) => {
		textStack.push("");

		if (tag.name === "d:entry") {
			summary.dEntryCount += 1;
			const titleAttribute = tag.attributes["d:title"];
			if (titleAttribute?.value) {
				summary.entryTitleValues.push(titleAttribute.value);
			}
		}

		if (tag.name === "d:index") {
			const valueAttribute = tag.attributes["d:value"];
			if (valueAttribute?.value) {
				summary.dIndexValues.push(valueAttribute.value);
			}
		}

		if (tag.name === "span") {
			const className = tag.attributes.class?.value;
			if (className === "part-of-speech") {
				summary.hasPartOfSpeech = true;
			}
			if (className === "pronunciation") {
				summary.hasPronunciation = true;
			}
			if (className === "translation") {
				summary.hasTranslation = true;
			}
		}

		if (tag.name === "p") {
			const className = tag.attributes.class?.value;
			if (className === "definition") {
				summary.hasDefinition = true;
			}
			if (className === "example") {
				summary.hasExample = true;
			}
		}

		if (tag.name === "d:parental-control") {
			summary.hasParentalControl = true;
		}
	});

	parser.on("text", (text) => {
		if (textStack.length === 0) {
			return;
		}
		const index = textStack.length - 1;
		textStack[index] = `${textStack[index]}${text}`;
	});

	parser.on("closetag", (tag) => {
		const textContent = textStack.pop()?.trim();
		if (!textContent) {
			return;
		}
		if (tag.name === "h1") {
			summary.headwords.push(textContent);
		}
	});

	parser.write(xml).close();
	return summary;
}

describe("serializeAppleDictionaryXml", () => {
	test("generates well-formed Apple DDS XML with required mapped elements", () => {
		const dogSense = {
			"@id": "urn:uuid:sense-dog-1" as URI,
			"@type": "ontolex:LexicalSense",
			"skos:definition": [
				langString(
					"A domesticated carnivorous mammal often kept as a pet.",
					"en" as LanguageTag,
				),
			],
			"lexicog:usageExample": [
				{
					"@id": "urn:uuid:example-dog-1" as URI,
					"@type": "lexicog:UsageExample",
					"rdf:value": [langString("The dog barked.", "en" as LanguageTag)],
				},
			],
			"vartrans:translation": [
				{
					"@id": "urn:uuid:translation-dog-can" as URI,
					"@type": "vartrans:Translation",
					"vartrans:target": "urn:uuid:sense-canine-1" as URI,
				},
			],
			"lexinfo:register": [LexInfoRegister.vulgarRegister],
		} satisfies LexicalSense;

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
					"ontolex:otherForm": [
						{
							"@id": "urn:uuid:form-dogs" as URI,
							"@type": "ontolex:Form",
							"ontolex:writtenRep": [langString("dogs", "en" as LanguageTag)],
						},
					],
					"ontolex:sense": [dogSense],
				},
				{
					"@id": "urn:uuid:entry-canine" as URI,
					"@type": "ontolex:LexicalEntry",
					"lime:language": "la" as LanguageTag,
					"lexinfo:partOfSpeech": [LexInfoPoS.noun],
					"ontolex:canonicalForm": {
						"@id": "urn:uuid:form-canine" as URI,
						"@type": "ontolex:Form",
						"ontolex:writtenRep": [langString("canis", "la" as LanguageTag)],
					},
					"ontolex:sense": [
						{
							"@id": "urn:uuid:sense-canine-1" as URI,
							"@type": "ontolex:LexicalSense",
							"skos:definition": [
								langString("A member of Canidae.", "en" as LanguageTag),
							],
						},
					],
				},
			],
		} satisfies Lexicon;

		const result = serializeAppleDictionaryXml(lexicon);
		const parsed = parseAppleXml(result.xml);

		expect(
			result.xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'),
		).toBe(true);
		expect(parsed.dEntryCount).toBe(2);
		expect(parsed.entryTitleValues).toContain("dog");
		expect(parsed.dIndexValues).toContain("dog");
		expect(parsed.dIndexValues).toContain("dogs");
		expect(parsed.headwords).toContain("dog");
		expect(parsed.hasPartOfSpeech).toBe(true);
		expect(parsed.hasPronunciation).toBe(true);
		expect(parsed.hasDefinition).toBe(true);
		expect(parsed.hasExample).toBe(true);
		expect(parsed.hasTranslation).toBe(true);
		expect(parsed.hasParentalControl).toBe(true);
		expect(result.xml).toContain("canis (la)");
	});

	test("uses strict LexInfoRegister.vulgarRegister for parental control", () => {
		const strictSense = {
			"@id": "urn:uuid:sense-strict-1" as URI,
			"@type": "ontolex:LexicalSense",
			"skos:definition": [langString("Mature content.", "en" as LanguageTag)],
			"lexinfo:register": [LexInfoRegister.formalRegister],
		} satisfies LexicalSense;

		const lexicon = {
			"@id": "urn:uuid:lex-strict" as URI,
			"@type": "lime:Lexicon",
			"lime:language": "en" as LanguageTag,
			"lime:entry": [
				{
					"@id": "urn:uuid:entry-strict" as URI,
					"@type": "ontolex:LexicalEntry",
					"lime:language": "en" as LanguageTag,
					"lexinfo:partOfSpeech": [LexInfoPoS.noun],
					"ontolex:canonicalForm": {
						"@id": "urn:uuid:form-strict" as URI,
						"@type": "ontolex:Form",
						"ontolex:writtenRep": [
							langString("strict-test", "en" as LanguageTag),
						],
					},
					"ontolex:sense": [strictSense],
				},
			],
		} satisfies Lexicon;

		const parsed = parseAppleXml(serializeAppleDictionaryXml(lexicon).xml);
		expect(parsed.hasParentalControl).toBe(false);
	});

	test("can opt-in to treat tabooRegister as inappropriate", () => {
		const tabooSense = {
			"@id": "urn:uuid:sense-taboo-1" as URI,
			"@type": "ontolex:LexicalSense",
			"skos:definition": [langString("Taboo topic.", "en" as LanguageTag)],
			"lexinfo:register": [LexInfoRegister.tabooRegister],
		} satisfies LexicalSense;

		const lexicon = {
			"@id": "urn:uuid:lex-taboo" as URI,
			"@type": "lime:Lexicon",
			"lime:language": "en" as LanguageTag,
			"lime:entry": [
				{
					"@id": "urn:uuid:entry-taboo" as URI,
					"@type": "ontolex:LexicalEntry",
					"lime:language": "en" as LanguageTag,
					"lexinfo:partOfSpeech": [LexInfoPoS.noun],
					"ontolex:canonicalForm": {
						"@id": "urn:uuid:form-taboo" as URI,
						"@type": "ontolex:Form",
						"ontolex:writtenRep": [
							langString("taboo-test", "en" as LanguageTag),
						],
					},
					"ontolex:sense": [tabooSense],
				},
			],
		} satisfies Lexicon;

		const withoutTaboo = parseAppleXml(
			serializeAppleDictionaryXml(lexicon).xml,
		);
		expect(withoutTaboo.hasParentalControl).toBe(false);

		const withTaboo = parseAppleXml(
			serializeAppleDictionaryXml(lexicon, {
				treatTabooRegisterAsInappropriate: true,
			}).xml,
		);
		expect(withTaboo.hasParentalControl).toBe(true);
	});
});
