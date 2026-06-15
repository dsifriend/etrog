import type { URI } from "../types/index.js";

/**
 * A syntactic argument slot within a `SyntacticFrame`.
 */
export interface SyntacticArgument {
	"@id": URI;
	"@type": "synsem:SyntacticArgument" | URI;
	/** The class or property this argument must satisfy. */
	"synsem:isA"?: URI;
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
