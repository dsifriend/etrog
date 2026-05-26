/**
 * Foundational branded types for the Etrog lexicographic toolkit.
 */

/** A branded string representing an IRI or URN. */
export type URI = string & { readonly __brand: "URI" };

/** A branded string for BCP 47 language tags (e.g. "en", "fr", "und"). */
export type LanguageTag = string & { readonly __brand: "LanguageTag" };

/** A JSON-LD language-tagged string. */
export interface LangString {
  "@value": string;
  "@language": LanguageTag;
}

/** A branded string for XSD date literals in YYYY-MM-DD format. */
export type XSDDate = string & { readonly __brand: "XSDDate" };

/** A plain object usable as a JSON-LD `@context` value. */
export type JsonLdContext = Record<string, unknown>;
