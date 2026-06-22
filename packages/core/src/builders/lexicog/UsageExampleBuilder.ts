import { langString } from "../../langstring.js";
import type { FormRestriction, UsageExample } from "../../lexicog/index.js";
import type { LanguageTag, URI } from "../../types/index.js";

/**
 * Fluent builder for `lexicog:UsageExample` objects.
 *
 * @example
 * const example = new UsageExampleBuilder("urn:uuid:example-1" as URI)
 *   .addValue("The house is on fire.", "en" as LanguageTag)
 *   .setSource("https://example.org/corpus/1" as URI)
 *   .build();
 */
export class UsageExampleBuilder {
	private readonly data: UsageExample;

	/**
	 * Initialises the builder with the given URI as `@id`.
	 * @param id - The URI for this usage example.
	 */
	constructor(id: URI) {
		this.data = {
			"@id": id,
			"@type": "lexicog:UsageExample",
			"rdf:value": [],
		};
	}

	/**
	 * Adds an example text value in the given language.
	 * @param value - The example text.
	 * @param lang - The BCP 47 language tag.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addValue("The house is on fire.", "en" as LanguageTag)
	 */
	addValue(value: string, lang: LanguageTag): this {
		this.data["rdf:value"].push(langString(value, lang));
		return this;
	}

	/**
	 * Sets the source URI for this example.
	 * @param uri - URI of the source.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setSource("https://example.org/corpus/1" as URI)
	 */
	setSource(uri: URI): this {
		this.data["dcterms:source"] = uri;
		return this;
	}

	/**
	 * Adds a form restriction (idempotent by `@id`).
	 * @param restriction - The `FormRestriction` to add.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addRestriction(formRestriction)
	 */
	addRestriction(restriction: FormRestriction): this {
		this.data["lexicog:restrictedTo"] ??= [];
		const restrictions = this.data["lexicog:restrictedTo"];
		if (!restrictions.some((r) => r["@id"] === restriction["@id"])) {
			restrictions.push(restriction);
		}
		return this;
	}

	/**
	 * Returns the built `UsageExample` plain object.
	 * @returns The constructed `UsageExample`.
	 *
	 * @example
	 * const example = builder.build();
	 */
	build(): UsageExample {
		return {
			...this.data,
			"rdf:value": [...this.data["rdf:value"]],
		};
	}
}
