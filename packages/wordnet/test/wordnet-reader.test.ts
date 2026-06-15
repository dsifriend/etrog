import { describe, expect, test } from "bun:test";
import type { URI } from "@etrog/core";
import { DEFAULT_CONTEXT } from "@etrog/core";
import { lexiconToDataset, serializeJsonLd } from "@etrog/rdf";
import {
  WnRelationCategories,
  isWnCategoryRelation,
  readOewnTurtle,
} from "../src/index.js";

/** Reads a UTF-8 fixture file relative to this test module. */
async function readFixture(name: string): Promise<string> {
  return Bun.file(new URL(`./fixtures/${name}`, import.meta.url)).text();
}

/** Sorts compacted JSON-LD graph nodes by `@id` for stable fixture comparison. */
function normalizeCompactedGraph(doc: Record<string, unknown>): Record<string, unknown> {
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

describe("readOewnTurtle", () => {
  test("parses OEWN Turtle, converts to Lexicon, and matches compacted JSON-LD fixture", async () => {
    const turtle = await readFixture("oewn-mini.ttl");
    const expectedCompact = JSON.parse(
      await readFixture("oewn-mini.expected.json"),
    ) as Record<string, unknown>;

    const lexicon = await readOewnTurtle(turtle);
    const dataset = await lexiconToDataset(lexicon);
    const compacted = (await serializeJsonLd(dataset, DEFAULT_CONTEXT)) as Record<
      string,
      unknown
    >;

    expect(normalizeCompactedGraph(compacted)).toEqual(
      normalizeCompactedGraph(expectedCompact),
    );
  });

  test("keeps wn relation categories compatible with vartrans:category", async () => {
    const relation = {
      "@id": "https://en-word.net/relation/dog-hypernym-canine" as URI,
      "@type": "vartrans:SenseRelation",
      "vartrans:source": "https://en-word.net/sense/dog-n-1" as URI,
      "vartrans:target": "https://en-word.net/sense/canine-n-1" as URI,
      "vartrans:category": WnRelationCategories.hypernym,
    };

    expect(isWnCategoryRelation(relation)).toBe(true);
  });
});
