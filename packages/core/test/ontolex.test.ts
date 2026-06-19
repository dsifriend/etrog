import { describe, expect, test } from "bun:test";
import type {
	Affix,
	ConceptSet,
	Form,
	LexicalConcept,
	LexicalEntry,
	LexicalSense,
	MultiwordExpression,
	OntologicalEntity,
	Usage,
	Word,
} from "../src/ontolex/index.js";
import type { LanguageTag, URI } from "../src/types/index.js";

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

	test("Usage interface compiles with rdf:value", () => {
		const usage: Usage = {
			"@id": "urn:uuid:usage-1" as URI,
			"@type": "ontolex:Usage",
			"rdf:value": [{ "@value": "archaic", "@language": en }],
		};
		expect(usage["rdf:value"]?.[0]["@value"]).toBe("archaic");
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

describe("LexicalEntry subtype interfaces", () => {
	test("Word compiles with LexicalEntry shape", () => {
		const form: Form = {
			"@id": "urn:uuid:form-2" as URI,
			"@type": "ontolex:Form",
			"ontolex:writtenRep": [{ "@value": "house", "@language": en }],
		};
		const word: Word = {
			"@id": "urn:uuid:word-1" as URI,
			"@type": "ontolex:Word",
			"ontolex:canonicalForm": form,
			"lime:language": en,
		};
		expect(word["@type"]).toBe("ontolex:Word");
	});

	test("MultiwordExpression compiles", () => {
		const form: Form = {
			"@id": "urn:uuid:form-3" as URI,
			"@type": "ontolex:Form",
			"ontolex:writtenRep": [{ "@value": "in spite of", "@language": en }],
		};
		const mwe: MultiwordExpression = {
			"@id": "urn:uuid:mwe-1" as URI,
			"@type": "ontolex:MultiwordExpression",
			"ontolex:canonicalForm": form,
			"lime:language": en,
		};
		expect(mwe["@type"]).toBe("ontolex:MultiwordExpression");
	});

	test("Affix compiles", () => {
		const form: Form = {
			"@id": "urn:uuid:form-4" as URI,
			"@type": "ontolex:Form",
			"ontolex:writtenRep": [{ "@value": "un-", "@language": en }],
		};
		const affix: Affix = {
			"@id": "urn:uuid:affix-1" as URI,
			"@type": "ontolex:Affix",
			"ontolex:canonicalForm": form,
			"lime:language": en,
		};
		expect(affix["@type"]).toBe("ontolex:Affix");
	});
});

describe("ConceptSet interface", () => {
	test("minimal valid ConceptSet object", () => {
		const set: ConceptSet = {
			"@id": "urn:uuid:conceptset-1" as URI,
			"@type": "ontolex:ConceptSet",
		};
		expect(set["@type"]).toBe("ontolex:ConceptSet");
	});
});

describe("OntologicalEntity interface", () => {
	test("minimal valid OntologicalEntity object", () => {
		const entity: OntologicalEntity = {
			"@id": "https://dbpedia.org/resource/House" as URI,
			"@type": ["owl:Class" as URI],
		};
		expect(entity["@id"] as string).toContain("dbpedia.org");
	});
});
