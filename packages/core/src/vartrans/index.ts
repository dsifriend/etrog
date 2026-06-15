import type { URI } from "../types/index.js";

/**
 * A generic lexico-semantic relation between two lexical resources.
 */
export interface LexicoSemanticRelation {
	"@id": URI;
	"@type": "vartrans:LexicoSemanticRelation" | URI;
	"vartrans:source"?: URI;
	"vartrans:target"?: URI;
	"vartrans:category"?: URI;
}

/** A relation between two lexical entries. */
export interface LexicalRelation extends Omit<LexicoSemanticRelation, "@type"> {
	"@type": "vartrans:LexicalRelation" | URI;
}

/** A relation between two lexical senses. */
export interface SenseRelation extends Omit<LexicoSemanticRelation, "@type"> {
	"@type": "vartrans:SenseRelation" | URI;
}

/** A terminological relation between two entries. */
export interface TerminologicalRelation
	extends Omit<LexicoSemanticRelation, "@type"> {
	"@type": "vartrans:TerminologicalRelation" | URI;
}

/** A translation relation between two senses or entries across languages. */
export interface Translation extends Omit<LexicoSemanticRelation, "@type"> {
	"@type": "vartrans:Translation" | URI;
}

/**
 * A set of translation relations, optionally sourced from an external resource.
 */
export interface TranslationSet {
	"@id": URI;
	"@type": "vartrans:TranslationSet" | URI;
	"vartrans:trans"?: Translation[];
	"dcterms:source"?: URI;
}

/** A conceptual relation between two lexical concepts. */
export interface ConceptualRelation
	extends Omit<LexicoSemanticRelation, "@type"> {
	"@type": "vartrans:ConceptualRelation" | URI;
}
