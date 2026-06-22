import type { URI } from "../../types/index.js";
import type { ConceptualRelation } from "../../vartrans/index.js";

/**
 * Fluent builder for `vartrans:ConceptualRelation` objects.
 *
 * @example
 * const rel = new ConceptualRelationBuilder("urn:uuid:..." as URI)
 *   .setSource("urn:uuid:concept-a" as URI)
 *   .setTarget("urn:uuid:concept-b" as URI)
 *   .build();
 */
export class ConceptualRelationBuilder {
	private readonly data: ConceptualRelation;

	/**
	 * Initialises the builder with the given URI as `@id`.
	 * @param id - The URI for this conceptual relation.
	 */
	constructor(id: URI) {
		this.data = {
			"@id": id,
			"@type": "vartrans:ConceptualRelation",
		};
	}

	/**
	 * Sets the source lexical concept URI.
	 * @param s - The source `URI`.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setSource("urn:uuid:..." as URI)
	 */
	setSource(s: URI): this {
		this.data["vartrans:source"] = s;
		return this;
	}

	/**
	 * Sets the target lexical concept URI.
	 * @param t - The target `URI`.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setTarget("urn:uuid:..." as URI)
	 */
	setTarget(t: URI): this {
		this.data["vartrans:target"] = t;
		return this;
	}

	/**
	 * Sets the relation category URI.
	 * @param cat - The category `URI` (e.g. a SKOS semantic relation).
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setCategory("http://www.w3.org/2004/02/skos/core#broader" as URI)
	 */
	setCategory(cat: URI): this {
		this.data["vartrans:category"] = cat;
		return this;
	}

	/**
	 * Adds a resource URI linked by the generic `vartrans:relates` property.
	 * @param resource - The related resource `URI`.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addRelates("urn:uuid:..." as URI)
	 */
	addRelates(resource: URI): this {
		this.data["vartrans:relates"] ??= [];
		const relates = this.data["vartrans:relates"];
		relates.push(resource);
		return this;
	}

	/**
	 * Returns the built `ConceptualRelation` plain object.
	 * @returns The constructed `ConceptualRelation`.
	 *
	 * @example
	 * const rel = builder.build();
	 */
	build(): ConceptualRelation {
		return { ...this.data };
	}
}
