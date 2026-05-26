import { test, expect, describe } from "bun:test";
import type {
  LexicoSemanticRelation,
  SenseRelation,
  Translation,
  TranslationSet,
  ConceptualRelation,
} from "../src/vartrans/index.js";
import type { URI } from "../src/types/index.js";

describe("SenseRelation interface", () => {
  test("minimal valid SenseRelation", () => {
    const rel: SenseRelation = {
      "@id": "urn:uuid:rel-1" as URI,
      "@type": "vartrans:SenseRelation",
    };
    expect(rel["@type"]).toBe("vartrans:SenseRelation");
  });
});

describe("Translation interface", () => {
  test("minimal valid Translation", () => {
    const tr: Translation = {
      "@id": "urn:uuid:tr-1" as URI,
      "@type": "vartrans:Translation",
    };
    expect(tr["@type"]).toBe("vartrans:Translation");
  });
});

describe("TranslationSet interface", () => {
  test("minimal valid TranslationSet", () => {
    const ts: TranslationSet = {
      "@id": "urn:uuid:ts-1" as URI,
      "@type": "vartrans:TranslationSet",
    };
    expect(ts["@type"]).toBe("vartrans:TranslationSet");
  });
});

describe("ConceptualRelation interface", () => {
  test("minimal valid ConceptualRelation", () => {
    const cr: ConceptualRelation = {
      "@id": "urn:uuid:cr-1" as URI,
      "@type": "vartrans:ConceptualRelation",
    };
    expect(cr["@type"]).toBe("vartrans:ConceptualRelation");
  });
});
