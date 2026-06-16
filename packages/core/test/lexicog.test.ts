import { test, expect, describe } from "bun:test";
import type {
	LexicographicResource,
	Entry,
	LexicographicComponent,
	UsageExample,
	FormRestriction,
} from "../src/lexicog/index.js";
import type { URI, LanguageTag } from "../src/types/index.js";

const en = "en" as LanguageTag;

describe("UsageExample interface", () => {
	test("minimal valid UsageExample", () => {
		const ex: UsageExample = {
			"@id": "urn:uuid:ex-1" as URI,
			"@type": "lexicog:UsageExample",
			"rdf:value": [{ "@value": "The house is big.", "@language": en }],
		};
		expect(ex["rdf:value"][0]["@value"]).toBe("The house is big.");
	});
});

describe("Entry interface", () => {
	test("minimal valid Entry", () => {
		const entry: Entry = {
			"@id": "urn:uuid:le-1" as URI,
			"@type": "lexicog:Entry",
		};
		expect(entry["@type"]).toBe("lexicog:Entry");
	});
});

describe("LexicographicResource interface", () => {
	test("minimal valid LexicographicResource", () => {
		const res: LexicographicResource = {
			"@id": "urn:uuid:res-1" as URI,
			"@type": "lexicog:LexicographicResource",
		};
		expect(res["@type"]).toBe("lexicog:LexicographicResource");
	});
});
