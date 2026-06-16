import { describe, expect, test } from "bun:test";
import type { URI } from "@etrog/core";
import { DEFAULT_CONTEXT } from "@etrog/core";
import { lexiconToDataset, serializeJsonLd } from "@etrog/rdf";
import {
	DbnaryTranslationCategories,
	isDbnaryCategoryTranslation,
	readDbnaryTurtle,
} from "../src/index";

/** Reads a UTF-8 fixture file relative to this test module. */
async function readFixture(name: string): Promise<string> {
	return Bun.file(new URL(`./fixtures/${name}`, import.meta.url)).text();
}

/** Sorts compacted JSON-LD graph nodes by `@id` for stable fixture comparison. */
function normalizeCompactedGraph(
	doc: Record<string, unknown>,
): Record<string, unknown> {
	const graph = doc["@graph"];
	if (!Array.isArray(graph)) {
		return doc;
	}

	const sortedGraph = [...graph].sort((a, b) => {
		const aId =
			typeof a === "object" && a !== null && "@id" in a
				? String((a as { "@id"?: unknown })["@id"] ?? "")
				: "";
		const bId =
			typeof b === "object" && b !== null && "@id" in b
				? String((b as { "@id"?: unknown })["@id"] ?? "")
				: "";
		return aId.localeCompare(bId);
	});

	return {
		...doc,
		"@graph": sortedGraph,
	};
}

describe("readDbnaryTurtle", () => {
	test("parses DBnary Turtle, converts to Lexicon, and matches compacted JSON-LD fixture", async () => {
		const turtle = await readFixture("dbnary-en-mini.ttl");
		const expectedCompact = JSON.parse(
			await readFixture("dbnary-en-mini.expected.json"),
		) as Record<string, unknown>;

		const lexicon = await readDbnaryTurtle(turtle);
		const dataset = await lexiconToDataset(lexicon);
		const compacted = (await serializeJsonLd(
			dataset,
			DEFAULT_CONTEXT,
		)) as Record<string, unknown>;

		expect(normalizeCompactedGraph(compacted)).toEqual(
			normalizeCompactedGraph(expectedCompact),
		);
	});

	test("keeps dbnary translation categories compatible with vartrans:category", async () => {
		const translation = {
			"@id":
				"http://kaiko.getalp.org/dbnary/eng/__tr_dog__fra__chien__1" as URI,
			"@type": "vartrans:Translation",
			"vartrans:source":
				"http://kaiko.getalp.org/dbnary/eng/_bis__dog__Noun__1" as URI,
			"vartrans:target":
				"http://kaiko.getalp.org/dbnary/fra/__ws_1__chien__Nom__1" as URI,
			"vartrans:category": DbnaryTranslationCategories.isTranslationOf,
		};

		expect(isDbnaryCategoryTranslation(translation)).toBe(true);
	});
});
