import type { LangString, URI } from "../types/index.js";

/**
 * A syntactic argument slot within a `SyntacticFrame`.
 */
export interface SyntacticArgument {
	"@id": URI;
	"@type": "synsem:SyntacticArgument" | URI;
	/** The class or property this argument must satisfy. */
	"synsem:isA"?: URI;
	/** Case marker, preposition, or particle associated with this argument. */
	"synsem:marker"?: LangString[];
	/** Boolean indicating if this argument is optional. */
	"synsem:optional"?: boolean;
}

/**
 * An ontology-to-syntax mapping node.
 */
export interface OntoMap {
	"@id": URI;
	"@type": "synsem:OntoMap" | URI;
	/** The subject of the mapped property. */
	"synsem:subjOfProp"?: URI;
	/** The object of the mapped property. */
	"synsem:objOfProp"?: URI;
	/** Links OntoMap to corresponding lexical sense. */
	"synsem:ontoMapping"?: URI;
	/** For complex multi-predicate mappings. */
	"synsem:submap"?: OntoMap[];
}

/**
 * A syntactic frame describing the argument structure of a lexical entry.
 * Corresponds to `synsem:SyntacticFrame`.
 */
export interface SyntacticFrame {
	"@id": URI;
	"@type": "synsem:SyntacticFrame" | URI;
	"synsem:synArg"?: SyntacticArgument[];
	"synsem:ontoCorrespondence"?: OntoMap[];
}
