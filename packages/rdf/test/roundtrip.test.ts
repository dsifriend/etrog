import { describe, expect, test } from "bun:test";
import type { LanguageTag, URI } from "@etrog/core";
import {
	DEFAULT_CONTEXT,
	FormBuilder,
	LexInfoPoS,
	LexicalEntryBuilder,
	LexiconBuilder,
} from "@etrog/core";
import {
	datasetToLexicon,
	lexiconToDataset,
	parseJsonLd,
	parseRdfXml,
	parseTurtle,
	serializeJsonLd,
	serializeRdfXml,
	serializeTurtle,
} from "../src/index.js";

// ---------------------------------------------------------------------------
// Build a minimal test Lexicon
// ---------------------------------------------------------------------------

const LEXICON_ID = "https://example.org/lexicon/en" as URI;
const ENTRY_ID = "https://example.org/entry/house" as URI;
const FORM_ID = "https://example.org/form/house" as URI;
const LANG = "en" as LanguageTag;

function buildTestLexicon() {
	const form = new FormBuilder(FORM_ID).addWrittenRep("house", LANG).build();

	const entry = new LexicalEntryBuilder(ENTRY_ID, LANG)
		.setCanonicalForm(form)
		.setPoS(LexInfoPoS.noun)
		.build();

	return new LexiconBuilder(LEXICON_ID, LANG)
		.setTitle("Test Lexicon", LANG)
		.addEntry(entry)
		.build();
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function assertLexiconEquivalent(
	original: ReturnType<typeof buildTestLexicon>,
	recovered: Awaited<ReturnType<typeof datasetToLexicon>>,
) {
	// @id
	expect(recovered["@id"]).toBe(original["@id"]);
	// language
	expect(recovered["lime:language"]).toBe(original["lime:language"]);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("JSON-LD round-trip", () => {
	test("lexicon → serializeJsonLd → parseJsonLd → datasetToLexicon", async () => {
		const original = buildTestLexicon();
		const dataset0 = await lexiconToDataset(original);

		const jsonDoc = await serializeJsonLd(dataset0, DEFAULT_CONTEXT);
		const dataset1 = await parseJsonLd(jsonDoc);
		const recovered = await datasetToLexicon(dataset1);

		assertLexiconEquivalent(original, recovered);
	});
});

describe("Turtle round-trip", () => {
	test("lexicon → lexiconToDataset → serializeTurtle → parseTurtle → datasetToLexicon", async () => {
		const original = buildTestLexicon();
		const dataset0 = await lexiconToDataset(original);

		const turtle = await serializeTurtle(dataset0);
		expect(turtle.length).toBeGreaterThan(0);

		const dataset1 = await parseTurtle(turtle);
		expect(dataset1.store.size).toBeGreaterThan(0);

		const recovered = await datasetToLexicon(dataset1);
		assertLexiconEquivalent(original, recovered);
	});
});

describe("RDF/XML round-trip", () => {
	test("lexicon → lexiconToDataset → serializeRdfXml → parseRdfXml → datasetToLexicon", async () => {
		const original = buildTestLexicon();
		const dataset0 = await lexiconToDataset(original);

		const xml = await serializeRdfXml(dataset0);
		expect(xml).toContain("rdf:RDF");
		expect(xml).toContain(LEXICON_ID);

		const dataset1 = await parseRdfXml(xml);
		expect(dataset1.store.size).toBeGreaterThan(0);

		const recovered = await datasetToLexicon(dataset1);
		assertLexiconEquivalent(original, recovered);
	});
});

describe("lexiconToDataset", () => {
	test("produces a non-empty store", async () => {
		const lexicon = buildTestLexicon();
		const dataset = await lexiconToDataset(lexicon);
		expect(dataset.store.size).toBeGreaterThan(0);
	});
});
