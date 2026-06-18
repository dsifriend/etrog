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
 * A morphological form of a lexical entry, with written and optionally phonetic representations.
 */
export interface Form {
	"@id": URI;
	"@type": "ontolex:Form" | URI;
	"ontolex:writtenRep": LangString[];
	"ontolex:phoneticRep"?: LangString[];
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
 */
export interface LexicalSense {
	"@id": URI;
	"@type": "ontolex:LexicalSense" | URI;
	"ontolex:reference"?: URI;
	"ontolex:isLexicalizedSenseOf"?: URI;
	"skos:definition"?: LangString[];
	"lexinfo:register"?: LexInfoRegister[];
	"lexicog:usageExample"?: UsageExample[];
	"vartrans:senseRel"?: SenseRelation[];
	"vartrans:translation"?: Translation[];
}

/**
 * An ontological concept that can be lexicalized by one or more lexical entries.
 */
export interface LexicalConcept {
	"@id": URI;
	"@type": "ontolex:LexicalConcept" | URI;
	"ontolex:isConceptOf"?: URI[];
	"skos:definition"?: LangString[];
	"skos:prefLabel"?: LangString[];
	"skos:altLabel"?: LangString[];
	"vartrans:conceptRel"?: ConceptualRelation[];
}

/**
 * A lexical entry in a lexicon, representing a single word or multiword expression.
 */
export interface LexicalEntry {
	"@id": URI;
	"@type": "ontolex:LexicalEntry" | URI;
	"ontolex:canonicalForm": Form;
	"ontolex:otherForm"?: Form[];
	"ontolex:lexicalForm"?: Form[];
	"ontolex:sense"?: LexicalSense[];
	"ontolex:evokes"?: LexicalConcept[];
	"lexinfo:partOfSpeech"?: LexInfoPoS[];
	"lime:language": LanguageTag;
	"decomp:subterm"?: Component[];
	"dcterms:source"?: URI;
	"dcterms:created"?: XSDDate;
	"dcterms:modified"?: XSDDate;
	"dcterms:creator"?: string;
	"rdfs:label"?: LangString[];
	"rdfs:comment"?: LangString[];
	"rdfs:seeAlso"?: URI[];
	"synsem:synBehavior"?: SyntacticFrame[];
}
