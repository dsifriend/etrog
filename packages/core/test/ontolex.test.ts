import { test, expect, describe } from "bun:test";
import type {
	Form,
	LexicalEntry,
	LexicalSense,
	LexicalConcept,
} from "../src/ontolex/index.js";
import type { URI, LanguageTag } from "../src/types/index.js";

const id = "urn:uuid:test-form-1" as URI;
const en = "en" as LanguageTag;

describe("Form interface", () => {
	test("minimal valid Form object compiles and has correct shape", () => {
		const form: Form = {
			"@id": id,
			"@type": "ontolex:Form",
			"ontolex:writtenRep": [{ "@value": "house", "@language": en }],
		};
		expect(form["@id"]).toBe(id);
		expect(form["@type"]).toBe("ontolex:Form");
		expect(form["ontolex:writtenRep"][0]["@value"]).toBe("house");
	});
});

describe("LexicalEntry interface", () => {
	test("minimal valid LexicalEntry object", () => {
		const form: Form = {
			"@id": "urn:uuid:form-1" as URI,
			"@type": "ontolex:Form",
			"ontolex:writtenRep": [{ "@value": "house", "@language": en }],
		};
		const entry: LexicalEntry = {
			"@id": "urn:uuid:entry-1" as URI,
			"@type": "ontolex:LexicalEntry",
			"ontolex:canonicalForm": form,
			"lime:language": en,
		};
		expect(entry["@id"] as string).toBe("urn:uuid:entry-1");
		expect(entry["lime:language"] as string).toBe("en");
	});
});

describe("LexicalSense interface", () => {
	test("minimal valid LexicalSense object", () => {
		const sense: LexicalSense = {
			"@id": "urn:uuid:sense-1" as URI,
			"@type": "ontolex:LexicalSense",
		};
		expect(sense["@id"] as string).toBe("urn:uuid:sense-1");
		expect(sense["@type"]).toBe("ontolex:LexicalSense");
	});
});

describe("LexicalConcept interface", () => {
	test("minimal valid LexicalConcept object", () => {
		const concept: LexicalConcept = {
			"@id": "urn:uuid:concept-1" as URI,
			"@type": "ontolex:LexicalConcept",
		};
		expect(concept["@id"] as string).toBe("urn:uuid:concept-1");
	});
});
