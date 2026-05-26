import { test, expect, describe } from "bun:test";
import type {
  Lexicon,
  LexicalizationSet,
  LexicalLinkset,
} from "../src/lime/index.js";
import type { URI, LanguageTag } from "../src/types/index.js";

const en = "en" as LanguageTag;

describe("Lexicon interface", () => {
  test("minimal valid Lexicon object", () => {
    const lexicon: Lexicon = {
      "@id": "urn:uuid:lex-1" as URI,
      "@type": "lime:Lexicon",
      "lime:language": en,
      "lime:entry": [],
    };
    expect(lexicon["@id"] as string).toBe("urn:uuid:lex-1");
    expect(lexicon["lime:language"] as string).toBe("en");
    expect(lexicon["lime:entry"]).toEqual([]);
  });
});

describe("LexicalizationSet interface", () => {
  test("minimal valid LexicalizationSet object", () => {
    const ls: LexicalizationSet = {
      "@id": "urn:uuid:ls-1" as URI,
      "@type": "lime:LexicalizationSet",
      "lime:language": en,
    };
    expect(ls["@type"]).toBe("lime:LexicalizationSet");
  });
});

describe("LexicalLinkset interface", () => {
  test("minimal valid LexicalLinkset object", () => {
    const ll: LexicalLinkset = {
      "@id": "urn:uuid:ll-1" as URI,
      "@type": "lime:LexicalLinkset",
    };
    expect(ll["@type"]).toBe("lime:LexicalLinkset");
  });
});
