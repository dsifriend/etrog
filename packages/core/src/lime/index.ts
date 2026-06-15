import type { LexicalEntry } from "../ontolex/index.js";
import type {
	JsonLdContext,
	LangString,
	LanguageTag,
	URI,
	XSDDate,
} from "../types/index.js";

/**
 * A lexicon — an organized collection of lexical entries for a specific language.
 * Corresponds to `lime:Lexicon`.
 */
export interface Lexicon {
	"@id": URI;
	"@type": "lime:Lexicon" | URI;
	"lime:language": LanguageTag;
	"lime:entry": LexicalEntry[];
	"lime:lexicalEntries"?: number;
	"ontolex:conceptSet"?: URI;
	"dcterms:title"?: LangString[];
	"dcterms:description"?: LangString[];
	"dcterms:license"?: URI;
	"dcterms:creator"?: string[];
	"dcterms:created"?: XSDDate;
	"dcterms:modified"?: XSDDate;
	"owl:versionInfo"?: string;
	"@context"?: JsonLdContext;
}

/**
 * A set of lexicalizations relating a lexicon to a reference dataset.
 */
export interface LexicalizationSet {
	"@id": URI;
	"@type": "lime:LexicalizationSet" | URI;
	"lime:lexiconDataset"?: URI;
	"lime:language": LanguageTag;
	"lime:lexicalEntries"?: number;
	"lime:percentage"?: number;
	"lime:referenceDataset"?: URI;
}

/**
 * A set of lexical links connecting a lexicon to a target dataset.
 */
export interface LexicalLinkset {
	"@id": URI;
	"@type": "lime:LexicalLinkset" | URI;
	"lime:lexiconDataset"?: URI;
	"lime:targetDataset"?: URI;
	"lime:links"?: number;
}
