import type { LangString, LanguageTag } from "./types/index.js";

/**
 * Constructs a single `LangString` value.
 *
 * @param value - The text content.
 * @param lang - The BCP 47 language tag.
 * @returns A `LangString` object.
 *
 * @example
 * langString("house", "en" as LanguageTag) // => { "@value": "house", "@language": "en" }
 */
export function langString(value: string, lang: LanguageTag): LangString {
  return { "@value": value, "@language": lang };
}

/**
 * Constructs an array of `LangString` values from a plain record.
 *
 * @param record - A mapping of language tag strings to text values.
 * @returns An array of `LangString` objects.
 *
 * @example
 * langStringMap({ en: "house", fr: "maison" })
 * // => [{ "@value": "house", "@language": "en" }, { "@value": "maison", "@language": "fr" }]
 */
export function langStringMap(record: Record<string, string>): LangString[] {
  return Object.entries(record).map(([lang, value]) =>
    langString(value, lang as LanguageTag),
  );
}

/**
 * Returns the text value for the given language tag, with fallback logic.
 * Falls back to `"und"` language if the requested tag is not found, then
 * returns the first available value if `"und"` is also absent.
 *
 * @param strings - The array of `LangString` values to search.
 * @param lang - The preferred BCP 47 language tag.
 * @returns The matching string, or `undefined` if `strings` is empty.
 *
 * @example
 * const ls = [langString("house", "en" as LanguageTag)];
 * getValueForLang(ls, "fr" as LanguageTag) // => "house" (fallback to first)
 */
export function getValueForLang(
  strings: LangString[],
  lang: LanguageTag,
): string | undefined {
  const exact = strings.find((s) => s["@language"] === lang);
  if (exact) return exact["@value"];

  const und = strings.find((s) => s["@language"] === ("und" as LanguageTag));
  if (und) return und["@value"];

  return strings[0]?.["@value"];
}
