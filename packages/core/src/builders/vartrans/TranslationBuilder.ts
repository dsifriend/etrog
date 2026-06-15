import type { URI } from "../../types/index.js";
import type { Translation } from "../../vartrans/index.js";

/**
 * Fluent builder for `vartrans:Translation` objects.
 *
 * @example
 * const tr = new TranslationBuilder("urn:uuid:..." as URI)
 *   .setSource("urn:uuid:sense-en" as URI)
 *   .setTarget("urn:uuid:sense-fr" as URI)
 *   .build();
 */
export class TranslationBuilder {
	private readonly data: Translation;

	/**
	 * Initialises the builder with the given URI as `@id`.
	 * @param id - The URI for this translation.
	 */
	constructor(id: URI) {
		this.data = {
			"@id": id,
			"@type": "vartrans:Translation",
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
	 * Sets the translation category URI.
	 * @param cat - The category `URI`.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setCategory("http://kaiko.getalp.org/dbnary#Translation" as URI)
	 */
	setCategory(cat: URI): this {
		this.data["vartrans:category"] = cat;
		return this;
	}

	/**
	 * Returns the built `Translation` plain object.
	 * @returns The constructed `Translation`.
	 *
	 * @example
	 * const tr = builder.build();
	 */
	build(): Translation {
		return { ...this.data };
	}
}
