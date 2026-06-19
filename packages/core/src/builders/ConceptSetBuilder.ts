import type { ConceptSet } from "../ontolex/index.js";
import type { URI } from "../types/index.js";

/**
 * Fluent builder for `ontolex:ConceptSet` objects.
 *
 * @example
 * const set = new ConceptSetBuilder("urn:uuid:..." as URI).build();
 */
export class ConceptSetBuilder {
	private readonly data: ConceptSet;

	/**
	 * Initialises the builder with the given URI as `@id`.
	 * @param id - The URI for this concept set.
	 */
	constructor(id: URI) {
		this.data = {
			"@id": id,
			"@type": "ontolex:ConceptSet",
		};
	}

	/**
	 * Returns the built `ConceptSet` plain object.
	 * @returns The constructed `ConceptSet`.
	 *
	 * @example
	 * const set = builder.build();
	 */
	build(): ConceptSet {
		return { ...this.data };
	}
}
