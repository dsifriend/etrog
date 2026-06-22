import { langString } from "../../langstring.js";
import type { SyntacticArgument } from "../../synsem/index.js";
import type { LanguageTag, URI } from "../../types/index.js";

/**
 * Fluent builder for `synsem:SyntacticArgument` objects.
 *
 * @example
 * const arg = new SyntacticArgumentBuilder("urn:uuid:arg-1" as URI)
 *   .setIsA("http://example.org/ontology#Agent" as URI)
 *   .addMarker("by", "en" as LanguageTag)
 *   .setOptional(false)
 *   .build();
 */
export class SyntacticArgumentBuilder {
	private readonly data: SyntacticArgument;

	/**
	 * Initialises the builder with the given URI as `@id`.
	 * @param id - The URI for this syntactic argument.
	 */
	constructor(id: URI) {
		this.data = {
			"@id": id,
			"@type": "synsem:SyntacticArgument",
		};
	}

	/**
	 * Sets the class or property this argument must satisfy.
	 * @param uri - URI of the class or property.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setIsA("http://example.org/ontology#Agent" as URI)
	 */
	setIsA(uri: URI): this {
		this.data["synsem:isA"] = uri;
		return this;
	}

	/**
	 * Adds a marker (case marker, preposition, or particle) for this argument.
	 * @param value - The marker text.
	 * @param lang - The BCP 47 language tag.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addMarker("in", "en" as LanguageTag)
	 */
	addMarker(value: string, lang: LanguageTag): this {
		this.data["synsem:marker"] ??= [];
		const markers = this.data["synsem:marker"];
		markers.push(langString(value, lang));
		return this;
	}

	/**
	 * Sets whether this argument is optional.
	 * @param optional - Boolean indicating if argument is optional.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setOptional(true)
	 */
	setOptional(optional: boolean): this {
		this.data["synsem:optional"] = optional;
		return this;
	}

	/**
	 * Returns the built `SyntacticArgument` plain object.
	 * @returns The constructed `SyntacticArgument`.
	 *
	 * @example
	 * const arg = builder.build();
	 */
	build(): SyntacticArgument {
		return { ...this.data };
	}
}
