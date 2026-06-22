import { langString } from "../../langstring.js";
import type { FormRestriction } from "../../lexicog/index.js";
import type { LanguageTag, URI } from "../../types/index.js";

/**
 * Fluent builder for `lexicog:FormRestriction` objects.
 *
 * @example
 * const restriction = new FormRestrictionBuilder("urn:uuid:restriction-1" as URI)
 *   .addWrittenRep("houses", "en" as LanguageTag)
 *   .build();
 */
export class FormRestrictionBuilder {
	private readonly data: FormRestriction;

	/**
	 * Initialises the builder with the given URI as `@id`.
	 * @param id - The URI for this form restriction.
	 */
	constructor(id: URI) {
		this.data = {
			"@id": id,
			"@type": "lexicog:FormRestriction",
		};
	}

	/**
	 * Adds a written representation to this restriction.
	 * @param value - The written form text.
	 * @param lang - The BCP 47 language tag.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addWrittenRep("houses", "en" as LanguageTag)
	 */
	addWrittenRep(value: string, lang: LanguageTag): this {
		this.data["ontolex:writtenRep"] ??= [];
		const writtenReps = this.data["ontolex:writtenRep"];
		writtenReps.push(langString(value, lang));
		return this;
	}

	/**
	 * Returns the built `FormRestriction` plain object.
	 * @returns The constructed `FormRestriction`.
	 *
	 * @example
	 * const restriction = builder.build();
	 */
	build(): FormRestriction {
		return { ...this.data };
	}
}
