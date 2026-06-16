import { describe, expect, test } from "bun:test";
import type { URI } from "@etrog/core";
import {
	DbnaryTranslationCategories,
	isDbnaryCategoryTranslation,
	isDbnaryResourceIri,
	isDbnaryUri,
} from "../src/index";

describe("dbnary schema helpers", () => {
	test("isDbnaryUri accepts dbnary namespace vocabulary terms", () => {
		expect(
			isDbnaryUri("http://kaiko.getalp.org/dbnary#isTranslationOf" as URI),
		).toBe(true);
		expect(
			isDbnaryUri("http://kaiko.getalp.org/dbnary#targetLanguage" as URI),
		).toBe(true);
		expect(
			isDbnaryUri("http://kaiko.getalp.org/dbnary/eng/cat__Noun__1" as URI),
		).toBe(false);
	});

	test("isDbnaryResourceIri accepts DBnary resource IRIs with ISO 639-3 graph segments", () => {
		expect(
			isDbnaryResourceIri(
				"http://kaiko.getalp.org/dbnary/eng/cat__Noun__1" as URI,
			),
		).toBe(true);
		expect(
			isDbnaryResourceIri(
				"http://kaiko.getalp.org/dbnary/eng/_bis__dog__Noun__1" as URI,
			),
		).toBe(true);
		expect(
			isDbnaryResourceIri(
				"http://kaiko.getalp.org/dbnary/fra/__ws_1__chien__Nom__1" as URI,
			),
		).toBe(true);
		expect(
			isDbnaryResourceIri(
				"http://kaiko.getalp.org/dbnary/eng_exolex/___en_dbnary_exolex_dataset" as URI,
			),
		).toBe(true);
	});

	test("isDbnaryResourceIri rejects non-conforming IRIs", () => {
		expect(
			isDbnaryResourceIri(
				"http://kaiko.getalp.org/dbnary#isTranslationOf" as URI,
			),
		).toBe(false);
		expect(
			isDbnaryResourceIri(
				"http://kaiko.getalp.org/dbnary/en/cat__Noun__1" as URI,
			),
		).toBe(false);
		expect(
			isDbnaryResourceIri(
				"https://kaiko.getalp.org/dbnary/eng/cat__Noun__1" as URI,
			),
		).toBe(false);
		expect(
			isDbnaryResourceIri("http://kaiko.getalp.org/dbnary/eng" as URI),
		).toBe(false);
		expect(
			isDbnaryResourceIri("http://example.org/dbnary/eng/cat__Noun__1" as URI),
		).toBe(false);
	});

	test("isDbnaryCategoryTranslation validates dbnary usage-intent URIs", () => {
		const translation = {
			"vartrans:category": DbnaryTranslationCategories.isTranslationOf,
		};

		expect(isDbnaryCategoryTranslation(translation)).toBe(true);
		expect(
			isDbnaryCategoryTranslation({
				"vartrans:category":
					"http://www.w3.org/ns/lemon/vartrans#translation" as URI,
			}),
		).toBe(false);
	});
});
