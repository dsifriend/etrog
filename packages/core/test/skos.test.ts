import { test, expect, describe } from "bun:test";
import type { ConceptScheme, Concept } from "../src/skos/index.js";
import type { URI, LanguageTag } from "../src/types/index.js";

const en = "en" as LanguageTag;

describe("ConceptScheme interface", () => {
	test("minimal valid ConceptScheme", () => {
		const scheme: ConceptScheme = {
			"@id": "urn:uuid:scheme-1" as URI,
			"@type": "skos:ConceptScheme",
		};
		expect(scheme["@type"]).toBe("skos:ConceptScheme");
	});
});

describe("Concept interface", () => {
	test("minimal valid Concept", () => {
		const concept: Concept = {
			"@id": "urn:uuid:concept-1" as URI,
			"@type": "skos:Concept",
		};
		expect(concept["@type"]).toBe("skos:Concept");
	});

	test("Concept with labels", () => {
		const concept: Concept = {
			"@id": "urn:uuid:concept-2" as URI,
			"@type": "skos:Concept",
			"skos:prefLabel": [{ "@value": "house", "@language": en }],
			"skos:altLabel": [{ "@value": "home", "@language": en }],
		};
		expect(concept["skos:prefLabel"]![0]["@value"]).toBe("house");
	});
});
