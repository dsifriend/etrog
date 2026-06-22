import type { URI } from "../../types/index.js";
import type { TerminologicalRelation } from "../../vartrans/index.js";

/**
 * Fluent builder for `vartrans:TerminologicalRelation` objects.
 *
 * @example
 * const rel = new TerminologicalRelationBuilder("urn:uuid:..." as URI)
 *   .setSource("urn:uuid:term-a" as URI)
 *   .setTarget("urn:uuid:term-b" as URI)
 *   .build();
 */
export class TerminologicalRelationBuilder {
	private readonly data: TerminologicalRelation;

	/**
	 * Initialises the builder with the given URI as `@id`.
	 * @param id - The URI for this terminological relation.
	 */
	constructor(id: URI) {
		this.data = {
			"@id": id,
			"@type": "vartrans:TerminologicalRelation",
		};
	}

	/**
	 * Sets the source entry URI.
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
	 * Sets the target entry URI.
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
	 * @param cat - The category `URI` (e.g. a terminological relation type).
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setCategory("http://example.org/terminology#broaderTerm" as URI)
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
	 * Returns the built `TerminologicalRelation` plain object.
	 * @returns The constructed `TerminologicalRelation`.
	 *
	 * @example
	 * const rel = builder.build();
	 */
	build(): TerminologicalRelation {
		return { ...this.data };
	}
}
