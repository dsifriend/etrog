import type { URI } from "../../types/index.js";
import type { SenseRelation } from "../../vartrans/index.js";

/**
 * Fluent builder for `vartrans:SenseRelation` objects.
 *
 * @example
 * const rel = new SenseRelationBuilder("urn:uuid:..." as URI)
 *   .setSource("urn:uuid:sense-a" as URI)
 *   .setTarget("urn:uuid:sense-b" as URI)
 *   .build();
 */
export class SenseRelationBuilder {
	private readonly data: SenseRelation;

	/**
	 * Initialises the builder with the given URI as `@id`.
	 * @param id - The URI for this sense relation.
	 */
	constructor(id: URI) {
		this.data = {
			"@id": id,
			"@type": "vartrans:SenseRelation",
		};
	}

	/**
	 * Sets the source sense URI.
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
	 * Sets the target sense URI.
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
	 * Returns the built `SenseRelation` plain object.
	 * @returns The constructed `SenseRelation`.
	 *
	 * @example
	 * const rel = builder.build();
	 */
	build(): SenseRelation {
		return { ...this.data };
	}
}
