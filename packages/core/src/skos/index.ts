import type { LangString, URI } from "../types/index.js";

/**
 * A SKOS concept scheme — a set of concepts that can be related to each other.
 */
export interface ConceptScheme {
	"@id": URI;
	"@type": "skos:ConceptScheme" | URI;
	"skos:prefLabel"?: LangString[];
	"skos:hasTopConcept"?: Concept[];
	"dcterms:title"?: LangString[];
}

/**
 * A SKOS concept — a unit of thought within a concept scheme.
 */
export interface Concept {
	"@id": URI;
	"@type": "skos:Concept" | URI;
	"skos:prefLabel"?: LangString[];
	"skos:altLabel"?: LangString[];
	"skos:definition"?: LangString[];
	"skos:broader"?: URI[];
	"skos:narrower"?: URI[];
	"skos:related"?: URI[];
	"skos:inScheme"?: URI;
}
