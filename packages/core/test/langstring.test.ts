import { test, expect, describe } from "bun:test";
import {
  langString,
  langStringMap,
  getValueForLang,
} from "../src/langstring.js";
import type { LanguageTag } from "../src/types/index.js";

const en = "en" as LanguageTag;
const fr = "fr" as LanguageTag;
const und = "und" as LanguageTag;

describe("langString", () => {
  test("creates a LangString with correct fields", () => {
    const ls = langString("house", en);
    expect(ls).toEqual({ "@value": "house", "@language": "en" as LanguageTag });
  });
});

describe("langStringMap", () => {
  test("creates array from record", () => {
    const result = langStringMap({ en: "house", fr: "maison" });
    expect(result).toHaveLength(2);
    expect(result).toContainEqual({ "@value": "house", "@language": "en" as LanguageTag });
    expect(result).toContainEqual({ "@value": "maison", "@language": "fr" as LanguageTag });
  });

  test("empty record returns empty array", () => {
    expect(langStringMap({})).toEqual([]);
  });
});

describe("getValueForLang", () => {
  const strings = [langString("house", en), langString("maison", fr)];

  test("returns exact match", () => {
    expect(getValueForLang(strings, en)).toBe("house");
    expect(getValueForLang(strings, fr)).toBe("maison");
  });

  test("falls back to und", () => {
    const withUnd = [langString("house", und), langString("maison", fr)];
    expect(getValueForLang(withUnd, en)).toBe("house");
  });

  test("falls back to first available when no exact or und", () => {
    expect(getValueForLang(strings, "de" as LanguageTag)).toBe("house");
  });

  test("returns undefined for empty array", () => {
    expect(getValueForLang([], en)).toBeUndefined();
  });
});
