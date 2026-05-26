import type { LangString, LanguageTag, URI } from "../types/index.js";

/**
 * A restriction on a lexicographic component to a specific word form.
 */
export interface FormRestriction {
  "@id": URI;
  "@type": "lexicog:FormRestriction" | URI;
  "ontolex:writtenRep"?: LangString[];
}

/**
 * A usage example attached to a lexical sense.
 */
export interface UsageExample {
  "@id": URI;
  "@type": "lexicog:UsageExample" | URI;
  /** The example text as a language-tagged string. */
  "rdf:value": LangString[];
  "dcterms:source"?: URI;
  "lexicog:restrictedTo"?: FormRestriction[];
}

/**
 * A recursive structural component within a lexicographic entry.
 */
export interface LexicographicComponent {
  "@id": URI;
  "@type": "lexicog:LexicographicComponent" | URI;
  "lexicog:subComponent"?: LexicographicComponent[];
}

/**
 * A lexicographic entry grouping information about a lexical entry.
 */
export interface Entry {
  "@id": URI;
  "@type": "lexicog:Entry" | URI;
  /** Reference to the `LexicalEntry` being described. */
  "lexicog:describes"?: URI;
  "lexicog:subComponent"?: LexicographicComponent[];
}

/**
 * A full lexicographic resource (dictionary or similar reference work).
 * Corresponds to `lexicog:LexicographicResource`.
 */
export interface LexicographicResource {
  "@id": URI;
  "@type": "lexicog:LexicographicResource" | URI;
  "lexicog:entry"?: Entry[];
  "dcterms:title"?: LangString[];
  "dcterms:language"?: LanguageTag;
}
