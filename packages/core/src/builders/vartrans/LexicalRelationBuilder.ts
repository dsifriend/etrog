import type { URI } from "../../types/index.js";
import type { LexicalRelation } from "../../vartrans/index.js";

/**
 * Fluent builder for `vartrans:LexicalRelation` objects.
 *
 * @example
 * const rel = new LexicalRelationBuilder("urn:uuid:..." as URI)
 *   .setSource("urn:uuid:entry-a" as URI)
 *   .setTarget("urn:uuid:entry-b" as URI)
 *   .build();
 */
export class LexicalRelationBuilder {
	private readonly data: LexicalRelation;

	/**
	 * Initialises the builder with the given URI as `@id`.
	 * @param id - The URI for this lexical relation.
	 */
	constructor(id: URI) {
		this.data = {
			"@id": id,
			"@type": "vartrans:LexicalRelation",
		};
	}

	/**
	 * Sets the source lexical entry URI.
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
	 * Sets the target lexical entry URI.
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
	 * @param cat - The category `URI` (e.g. a LexInfo morphological relation).
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setCategory("http://www.lexinfo.net/ontology/3.0/lexinfo#derivation" as URI)
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
	 * Returns the built `LexicalRelation` plain object.
	 * @returns The constructed `LexicalRelation`.
	 *
	 * @example
	 * const rel = builder.build();
	 */
	build(): LexicalRelation {
		return { ...this.data };
	}
}
