import { describe, expect, test } from "bun:test";
import type {
	ConceptualizationSet,
	LexicalizationSet,
	LexicalLinkset,
	Lexicon,
} from "../src/lime/index.js";
import type { LanguageTag, URI } from "../src/types/index.js";

const en = "en" as LanguageTag;

describe("Lexicon interface", () => {
	test("minimal valid Lexicon object", () => {
		const lexicon: Lexicon = {
			"@id": "urn:uuid:lex-1" as URI,
			"@type": "lime:Lexicon",
			"lime:language": en,
			"lime:entry": [],
		};
		expect(lexicon["@id"] as string).toBe("urn:uuid:lex-1");
		expect(lexicon["lime:language"] as string).toBe("en");
		expect(lexicon["lime:entry"]).toEqual([]);
	});
});

describe("LexicalizationSet interface", () => {
	test("minimal valid LexicalizationSet object", () => {
		const ls: LexicalizationSet = {
			"@id": "urn:uuid:ls-1" as URI,
			"@type": "lime:LexicalizationSet",
			"lime:language": en,
		};
		expect(ls["@type"]).toBe("lime:LexicalizationSet");
	});
});

describe("LexicalLinkset interface", () => {
	test("minimal valid LexicalLinkset object", () => {
		const ll: LexicalLinkset = {
			"@id": "urn:uuid:ll-1" as URI,
			"@type": "lime:LexicalLinkset",
		};
		expect(ll["@type"]).toBe("lime:LexicalLinkset");
	});
});

describe("ConceptualizationSet interface", () => {
	test("minimal valid ConceptualizationSet object", () => {
		const cs: ConceptualizationSet = {
			"@id": "urn:uuid:cs-1" as URI,
			"@type": "lime:ConceptualizationSet",
		};
		expect(cs["@type"]).toBe("lime:ConceptualizationSet");
	});
});
