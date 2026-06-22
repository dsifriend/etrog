import { langString } from "../../langstring.js";
import type { Entry, LexicographicResource } from "../../lexicog/index.js";
import type { LanguageTag, URI } from "../../types/index.js";

/**
 * Fluent builder for `lexicog:LexicographicResource` objects.
 *
 * @example
 * const resource = new LexicographicResourceBuilder("urn:uuid:resource-1" as URI)
 *   .addTitle("Oxford English Dictionary", "en" as LanguageTag)
 *   .setLanguage("en" as LanguageTag)
 *   .addEntry(entry)
 *   .build();
 */
export class LexicographicResourceBuilder {
	private readonly data: LexicographicResource;

	/**
	 * Initialises the builder with the given URI as `@id`.
	 * @param id - The URI for this lexicographic resource.
	 */
	constructor(id: URI) {
		this.data = {
			"@id": id,
			"@type": "lexicog:LexicographicResource",
		};
	}

	/**
	 * Adds a title in the given language.
	 * @param value - The title text.
	 * @param lang - The BCP 47 language tag.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addTitle("Oxford English Dictionary", "en" as LanguageTag)
	 */
	addTitle(value: string, lang: LanguageTag): this {
		this.data["dcterms:title"] ??= [];
		const titles = this.data["dcterms:title"];
		titles.push(langString(value, lang));
		return this;
	}

	/**
	 * Sets the primary language of this resource.
	 * @param lang - The BCP 47 language tag.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setLanguage("en" as LanguageTag)
	 */
	setLanguage(lang: LanguageTag): this {
		this.data["dcterms:language"] = lang;
		return this;
	}

	/**
	 * Adds a lexicographic entry (idempotent by `@id`).
	 * @param entry - The `Entry` to add.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addEntry(entry)
	 */
	addEntry(entry: Entry): this {
		this.data["lexicog:entry"] ??= [];
		const entries = this.data["lexicog:entry"];
		if (!entries.some((e) => e["@id"] === entry["@id"])) {
			entries.push(entry);
		}
		return this;
	}

	/**
	 * Returns the built `LexicographicResource` plain object.
	 * @returns The constructed `LexicographicResource`.
	 *
	 * @example
	 * const resource = builder.build();
	 */
	build(): LexicographicResource {
		return { ...this.data };
	}
}
