import type { Component } from "../decomp/index.js";
import type { UsageExample } from "../lexicog/index.js";
import type {
	LexInfoCase,
	LexInfoDegree,
	LexInfoGender,
	LexInfoMood,
	LexInfoNumber,
	LexInfoPerson,
	LexInfoPoS,
	LexInfoRegister,
	LexInfoTense,
	LexInfoVoice,
} from "../lexinfo/index.js";
import type { SyntacticFrame } from "../synsem/index.js";
import type { LangString, LanguageTag, URI, XSDDate } from "../types/index.js";
import type {
	ConceptualRelation,
	SenseRelation,
	Translation,
} from "../vartrans/index.js";

/**
 * A usage constraint or pragmatic note for a lexical sense.
 */
export interface Usage {
	"@id": URI;
	"@type": "ontolex:Usage" | URI;
	"rdf:value"?: LangString[];
}

/**
 * A morphological form of a lexical entry, with written and optionally phonetic representations.
 */
export interface Form {
	"@id": URI;
	"@type": "ontolex:Form" | URI;
	"ontolex:writtenRep": LangString[];
	"ontolex:phoneticRep"?: LangString[];
	"ontolex:representation"?: LangString[];
	"lexinfo:gender"?: LexInfoGender[];
	"lexinfo:number"?: LexInfoNumber[];
	"lexinfo:case"?: LexInfoCase[];
	"lexinfo:tense"?: LexInfoTense[];
	"lexinfo:mood"?: LexInfoMood[];
	"lexinfo:voice"?: LexInfoVoice[];
	"lexinfo:person"?: LexInfoPerson[];
	"lexinfo:degree"?: LexInfoDegree[];
}

/**
 * A lexical sense linking a lexical entry to an ontological concept.
 *
 * See {@link OntologicalEntity} for the ontology-side inverse via
 * `ontolex:isReferenceOf` (inverse of `ontolex:reference`).
 */
export interface LexicalSense {
	"@id": URI;
	"@type": "ontolex:LexicalSense" | URI;
	"ontolex:reference"?: URI;
	"ontolex:isLexicalizedSenseOf"?: URI;
	"ontolex:usage"?: Usage[];
	"ontolex:isSenseOf"?: LexicalEntry[];
	"skos:definition"?: LangString[];
	"lexinfo:register"?: LexInfoRegister[];
	"lexicog:usageExample"?: UsageExample[];
	/** Evaluable constraint on sense usage. */
	"synsem:condition"?: LangString[];
	/** Constraint on property's first argument type. */
	"synsem:propertyDomain"?: URI;
	/** Constraint on property's second argument type. */
	"synsem:propertyRange"?: URI;
	/** Reified sense relations. */
	"vartrans:senseRel"?: SenseRelation[];
	/** Shortcut property for direct sense-to-sense relations (alternative to reification). */
	"vartrans:relates"?: URI[];
	/** Reified translation relations. */
	"vartrans:translation"?: Translation[];
	/** Shortcut property for direct translatable-as relations (alternative to reification). */
	"vartrans:translatableAs"?: URI[];
}

/**
 * An ontological concept that can be lexicalized by one or more lexical entries.
 *
 * See {@link OntologicalEntity} for the ontology-side inverse via
 * `ontolex:concept` (inverse of `ontolex:isConceptOf`).
 */
export interface LexicalConcept {
	"@id": URI;
	"@type": "ontolex:LexicalConcept" | URI;
	"ontolex:isConceptOf"?: URI[];
	"ontolex:lexicalizedSense"?: LexicalSense[];
	"ontolex:isEvokedBy"?: LexicalEntry[];
	"skos:definition"?: LangString[];
	"skos:prefLabel"?: LangString[];
	"skos:altLabel"?: LangString[];
	/** Reified conceptual relations. */
	"vartrans:conceptRel"?: ConceptualRelation[];
}

/**
 * A lexical entry in a lexicon, representing a single word or multiword expression.
 *
 * See {@link OntologicalEntity} for the ontology-side inverse via
 * `ontolex:isDenotedBy` (inverse of `ontolex:denotes`).
 */
export interface LexicalEntry {
	"@id": URI;
	"@type": "ontolex:LexicalEntry" | URI;
	"ontolex:canonicalForm": Form;
	"ontolex:otherForm"?: Form[];
	"ontolex:lexicalForm"?: Form[];
	"ontolex:sense"?: LexicalSense[];
	"ontolex:evokes"?: LexicalConcept[];
	"ontolex:denotes"?: URI[];
	"ontolex:morphologicalPattern"?: URI[];
	"lexinfo:partOfSpeech"?: LexInfoPoS[];
	"lime:language": LanguageTag;
	/** Simple subterm links (without ordering). */
	"decomp:subterm"?: URI[];
	/** Ordered constituent components (using Component reification). */
	"decomp:constituent"?: Component[];
	"dcterms:source"?: URI;
	"dcterms:created"?: XSDDate;
	"dcterms:modified"?: XSDDate;
	"dcterms:creator"?: string;
	"rdfs:label"?: LangString[];
	"rdfs:comment"?: LangString[];
	"rdfs:seeAlso"?: URI[];
	"synsem:synBehavior"?: SyntacticFrame[];
	/** Shortcut property for direct entry-to-entry lexical relations (alternative to reification). */
	"vartrans:lexicalRel"?: URI[];
	/** Shortcut property for direct translation relations (alternative to reification). */
	"vartrans:translation"?: URI[];
}

/**
 * A lexical entry representing a single token (a word).
 */
export interface Word extends Omit<LexicalEntry, "@type"> {
	"@type": "ontolex:Word" | URI;
}

/**
 * A lexical entry representing a multi-token expression.
 */
export interface MultiwordExpression extends Omit<LexicalEntry, "@type"> {
	"@type": "ontolex:MultiwordExpression" | URI;
}

/**
 * A lexical entry representing an affix (prefix, suffix, etc.).
 */
export interface Affix extends Omit<LexicalEntry, "@type"> {
	"@type": "ontolex:Affix" | URI;
}

/**
 * A set of lexical concepts grouped together (e.g., synsets).
 */
export interface ConceptSet {
	"@id": URI;
	"@type": "ontolex:ConceptSet" | URI;
}

/**
 * An ontological entity that can be linked to lexical concepts and entries.
 *
 * This interface models the ontology-side nodes (classes, properties, individuals)
 * that are denoted by lexical entries or referenced by lexical senses. It is
 * intentionally separate from `LexicalEntry` to avoid forcing ontology-specific
 * fields onto lexical data, while still enabling bidirectional navigation.
 *
 * Relationships:
 * - `ontolex:isDenotedBy` links back to the `LexicalEntry` instances that denote
 *   this entity (inverse of `ontolex:denotes`).
 * - `ontolex:isReferenceOf` links back to the `LexicalSense` instances that
 *   reference this entity (inverse of `ontolex:reference`).
 * - `ontolex:concept` links this entity to one or more `LexicalConcept` nodes
 *   (inverse of `ontolex:isConceptOf`).
 */
export interface OntologicalEntity {
	"@id": URI;
	"@type"?: URI | URI[];
	"ontolex:isDenotedBy"?: LexicalEntry[];
	"ontolex:isReferenceOf"?: LexicalSense[];
	"ontolex:concept"?: LexicalConcept[];
}
