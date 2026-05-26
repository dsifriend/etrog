import { test, expect, describe } from "bun:test";
import {
  LexInfoPoS,
  LexInfoGender,
  LexInfoNumber,
  LexInfoTense,
  LexInfoMood,
  LexInfoVoice,
  LexInfoPerson,
  LexInfoCase,
  LexInfoDegree,
  LexInfoAspect,
  LexInfoDefiniteness,
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
  test("all 15 PoS values are defined", () => {
    expect(Object.keys(LexInfoPoS)).toHaveLength(15);
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
  test("all 8 cases are defined", () => {
    expect(Object.keys(LexInfoCase)).toHaveLength(8);
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
    expect(LexInfoDefiniteness.definite).toBe(
      `${BASE}definiteness-definite`,
    );
  });
  test("indefinite resolves correctly", () => {
    expect(LexInfoDefiniteness.indefinite).toBe(
      `${BASE}definiteness-indefinite`,
    );
  });
});
