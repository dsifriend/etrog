import { describe, expect, test } from "bun:test";
import {
	LexInfoAspect,
	LexInfoCase,
	LexInfoDefiniteness,
	LexInfoDegree,
	LexInfoGender,
	LexInfoMood,
	LexInfoNumber,
	LexInfoPerson,
	LexInfoPoS,
	LexInfoRegister,
	LexInfoTense,
	LexInfoVoice,
} from "../src/lexinfo/index.js";

const BASE = "http://www.lexinfo.net/ontology/3.0/lexinfo#";

describe("LexInfoPoS", () => {
	test("noun resolves to correct URI", () => {
		expect(LexInfoPoS.noun).toBe(`${BASE}noun`);
	});
	test("verb resolves to correct URI", () => {
		expect(LexInfoPoS.verb).toBe(`${BASE}verb`);
	});
	test("adjective resolves to correct URI", () => {
		expect(LexInfoPoS.adjective).toBe(`${BASE}adjective`);
	});
	test("contains a core subset of PoS categories", () => {
		// This subset is arbitrary, though admittedly influenced
		// by Western-European grammars: practically, it tests that LexInfoPoS
		// contains enough properly constructed categories to be useful.
		expect(LexInfoPoS.determiner).toBe(`${BASE}determiner`);
		expect(LexInfoPoS.article).toBe(`${BASE}article`);
		expect(LexInfoPoS.noun).toBe(`${BASE}noun`);
		expect(LexInfoPoS.adjective).toBe(`${BASE}adjective`);
		expect(LexInfoPoS.verb).toBe(`${BASE}verb`);
		expect(LexInfoPoS.adverb).toBe(`${BASE}adverb`);
		expect(LexInfoPoS.preposition).toBe(`${BASE}preposition`);
		expect(LexInfoPoS.pronoun).toBe(`${BASE}pronoun`);
		expect(LexInfoPoS.conjunction).toBe(`${BASE}conjunction`);
		expect(LexInfoPoS.interjection).toBe(`${BASE}interjection`);
	});

	test("all exported PoS values are LexInfo URIs", () => {
		for (const value of Object.values(LexInfoPoS)) {
			expect(typeof value).toBe("string");
			expect(value.startsWith(BASE)).toBe(true);
			expect(value.length).toBeGreaterThan(BASE.length);
		}
	});

	test("all exported PoS values are unique", () => {
		const values = Object.values(LexInfoPoS);
		expect(new Set(values).size).toBe(values.length);
	});
});

describe("LexInfoGender", () => {
	test("masculine resolves to correct URI", () => {
		expect(LexInfoGender.masculine).toBe(`${BASE}masculine`);
	});
	test("common resolves to commonGender URI", () => {
		expect(LexInfoGender.common).toBe(`${BASE}commonGender`);
	});
});

describe("LexInfoNumber", () => {
	test("singular resolves correctly", () => {
		expect(LexInfoNumber.singular).toBe(`${BASE}singular`);
	});
	test("dual resolves correctly", () => {
		expect(LexInfoNumber.dual).toBe(`${BASE}dual`);
	});
});

describe("LexInfoTense", () => {
	test("present resolves to presentTense", () => {
		expect(LexInfoTense.present).toBe(`${BASE}presentTense`);
	});
	test("past resolves to pastTense", () => {
		expect(LexInfoTense.past).toBe(`${BASE}pastTense`);
	});
});

describe("LexInfoMood", () => {
	test("indicative resolves to indicativeMood", () => {
		expect(LexInfoMood.indicative).toBe(`${BASE}indicativeMood`);
	});
});

describe("LexInfoVoice", () => {
	test("active resolves to activeVoice", () => {
		expect(LexInfoVoice.active).toBe(`${BASE}activeVoice`);
	});
});

describe("LexInfoPerson", () => {
	test("first resolves to firstPerson", () => {
		expect(LexInfoPerson.first).toBe(`${BASE}firstPerson`);
	});
	test("third resolves to thirdPerson", () => {
		expect(LexInfoPerson.third).toBe(`${BASE}thirdPerson`);
	});
});

describe("LexInfoCase", () => {
	test("nominative resolves to nominativeCase", () => {
		expect(LexInfoCase.nominative).toBe(`${BASE}nominativeCase`);
	});
	test("contains core grammatical cases", () => {
		expect(LexInfoCase.nominative).toBe(`${BASE}nominativeCase`);
		expect(LexInfoCase.accusative).toBe(`${BASE}accusativeCase`);
		expect(LexInfoCase.genitive).toBe(`${BASE}genitiveCase`);
		expect(LexInfoCase.dative).toBe(`${BASE}dativeCase`);
		expect(LexInfoCase.ablative).toBe(`${BASE}ablativeCase`);
		expect(LexInfoCase.instrumental).toBe(`${BASE}instrumentalCase`);
		expect(LexInfoCase.locative).toBe(`${BASE}locativeCase`);
		expect(LexInfoCase.vocative).toBe(`${BASE}vocativeCase`);
	});
	test("all exported case values are LexInfo URIs", () => {
		for (const value of Object.values(LexInfoCase)) {
			expect(typeof value).toBe("string");
			expect(value.startsWith(BASE)).toBe(true);
			expect(value.length).toBeGreaterThan(BASE.length);
		}
	});
	test("all exported case values are unique", () => {
		const values = Object.values(LexInfoCase);
		expect(new Set(values).size).toBe(values.length);
	});
});

describe("LexInfoDegree", () => {
	test("positive resolves to positiveDegree", () => {
		expect(LexInfoDegree.positive).toBe(`${BASE}positiveDegree`);
	});
	test("superlative resolves to superlativeDegree", () => {
		expect(LexInfoDegree.superlative).toBe(`${BASE}superlativeDegree`);
	});
});

describe("LexInfoAspect", () => {
	test("perfective resolves to perfectiveAspect", () => {
		expect(LexInfoAspect.perfective).toBe(`${BASE}perfectiveAspect`);
	});
});

describe("LexInfoDefiniteness", () => {
	test("definite resolves correctly", () => {
		expect(LexInfoDefiniteness.definite).toBe(`${BASE}definiteness-definite`);
	});
	test("indefinite resolves correctly", () => {
		expect(LexInfoDefiniteness.indefinite).toBe(
			`${BASE}definiteness-indefinite`,
		);
	});
});

describe("LexInfoRegister", () => {
	test("register resolves correctly", () => {
		expect(LexInfoRegister.register).toBe(`${BASE}register`);
	});
	test("vulgar register resolves correctly", () => {
		expect(LexInfoRegister.vulgarRegister).toBe(`${BASE}vulgarRegister`);
	});
	test("formal register resolves correctly", () => {
		expect(LexInfoRegister.formalRegister).toBe(`${BASE}formalRegister`);
	});
});
