import { langString } from "../langstring.js";
import type { Lexicon } from "../lime/index.js";
import type { LexicalEntry } from "../ontolex/index.js";
import type { LanguageTag, URI } from "../types/index.js";

/**
 * Fluent builder for `lime:Lexicon` objects.
 *
 * @example
 * const lexicon = new LexiconBuilder("urn:uuid:..." as URI, "en" as LanguageTag)
 *   .setTitle("My Lexicon", "en" as LanguageTag)
 *   .addEntry(entry)
 *   .build();
 */
export class LexiconBuilder {
	private readonly data: Lexicon;

	/**
	 * Initialises the builder with the given URI and language.
	 * @param id - The URI for this lexicon.
	 * @param language - The BCP 47 language tag for the lexicon.
	 */
	constructor(id: URI, language: LanguageTag) {
		this.data = {
			"@id": id,
			"@type": "lime:Lexicon",
			"lime:language": language,
			"lime:entry": [],
		};
	}

	/**
	 * Adds a lexical entry to the lexicon (idempotent by `@id`).
	 * @param entry - The `LexicalEntry` to add.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addEntry(entry)
	 */
	addEntry(entry: LexicalEntry): this {
		if (!this.data["lime:entry"].some((e) => e["@id"] === entry["@id"])) {
			this.data["lime:entry"].push(entry);
		}
		return this;
	}

	/**
	 * Sets the title of the lexicon in the given language.
	 * @param value - The title text.
	 * @param lang - The BCP 47 language tag.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setTitle("English Lexicon", "en" as LanguageTag)
	 */
	setTitle(value: string, lang: LanguageTag): this {
		if (!this.data["dcterms:title"]) {
			this.data["dcterms:title"] = [];
		}
		this.data["dcterms:title"]!.push(langString(value, lang));
		return this;
	}

	/**
	 * Sets the license URI for this lexicon.
	 * @param uri - The license URI.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setLicense("https://creativecommons.org/licenses/by/4.0/" as URI)
	 */
	setLicense(uri: URI): this {
		this.data["dcterms:license"] = uri;
		return this;
	}

	/**
	 * Adds a creator name to the lexicon.
	 * @param name - The creator's name.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addCreator("Jane Smith")
	 */
	addCreator(name: string): this {
		if (!this.data["dcterms:creator"]) {
			this.data["dcterms:creator"] = [];
		}
		this.data["dcterms:creator"]!.push(name);
		return this;
	}

	/**
	 * Sets the URI of the concept set associated with this lexicon.
	 * @param uri - The concept set URI.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setConceptSet("https://example.org/concepts" as URI)
	 */
	setConceptSet(uri: URI): this {
		this.data["ontolex:conceptSet"] = uri;
		return this;
	}

	/**
	 * Merges arbitrary metadata onto the lexicon (excluding identity and entry fields).
	 * @param meta - Partial `Lexicon` properties to merge.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setMetadata({ "owl:versionInfo": "1.0.0" })
	 */
	setMetadata(
		meta: Partial<
			Omit<Lexicon, "@id" | "@type" | "lime:language" | "lime:entry">
		>,
	): this {
		Object.assign(this.data, meta);
		return this;
	}

	/**
	 * Returns the built `Lexicon` plain object.
	 * @returns The constructed `Lexicon`.
	 *
	 * @example
	 * const lexicon = builder.build();
	 */
	build(): Lexicon {
		return {
			...this.data,
			"lime:entry": [...this.data["lime:entry"]],
		};
	}
}
