import { langString } from "../langstring.js";
import type { LexInfoPoS } from "../lexinfo/index.js";
import type { Form, LexicalEntry, LexicalSense } from "../ontolex/index.js";
import type { LanguageTag, URI } from "../types/index.js";

/**
 * Fluent builder for `ontolex:LexicalEntry` objects.
 *
 * @example
 * const entry = new LexicalEntryBuilder("urn:uuid:..." as URI, "en" as LanguageTag)
 *   .setCanonicalForm(form)
 *   .setPoS(LexInfoPoS.noun)
 *   .build();
 */
export class LexicalEntryBuilder {
	private readonly data: LexicalEntry;

	/**
	 * Initialises the builder with the given URI and language.
	 * @param id - The URI for this lexical entry.
	 * @param language - The BCP 47 language tag of the entry.
	 */
	constructor(id: URI, canonicalForm: Form, language: LanguageTag) {
		this.data = {
			"@id": id,
			"@type": "ontolex:LexicalEntry",
			"ontolex:canonicalForm": canonicalForm,
			"lime:language": language,
		};
	}

	/**
	 * Sets the canonical (dictionary) form.
	 * @param form - The canonical `Form`.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setCanonicalForm(form)
	 */
	setCanonicalForm(form: Form): this {
		this.data["ontolex:canonicalForm"] = form;
		return this;
	}

	/**
	 * Adds an inflected or alternative form (idempotent by `@id`).
	 * @param form - An `otherForm` `Form` object.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addOtherForm(pluralForm)
	 */
	addOtherForm(form: Form): this {
		if (!this.data["ontolex:otherForm"]) {
			this.data["ontolex:otherForm"] = [];
		}
		const existing = this.data["ontolex:otherForm"]!;
		if (!existing.some((f) => f["@id"] === form["@id"])) {
			existing.push(form);
		}
		return this;
	}

	/**
	 * Adds a lexical sense (idempotent by `@id`).
	 * @param sense - The `LexicalSense` to add.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addSense(sense)
	 */
	addSense(sense: LexicalSense): this {
		if (!this.data["ontolex:sense"]) {
			this.data["ontolex:sense"] = [];
		}
		const existing = this.data["ontolex:sense"]!;
		if (!existing.some((s) => s["@id"] === sense["@id"])) {
			existing.push(sense);
		}
		return this;
	}

	/**
	 * Sets the part-of-speech to a single value (replaces any existing PoS).
	 * @param pos - A `LexInfoPoS` value.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setPoS(LexInfoPoS.noun)
	 */
	setPoS(pos: LexInfoPoS): this {
		this.data["lexinfo:partOfSpeech"] = [pos];
		return this;
	}

	/**
	 * Appends a part-of-speech value (idempotent).
	 * @param pos - A `LexInfoPoS` value.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addPoS(LexInfoPoS.adjective)
	 */
	addPoS(pos: LexInfoPoS): this {
		if (!this.data["lexinfo:partOfSpeech"]) {
			this.data["lexinfo:partOfSpeech"] = [];
		}
		if (!this.data["lexinfo:partOfSpeech"]!.includes(pos)) {
			this.data["lexinfo:partOfSpeech"]!.push(pos);
		}
		return this;
	}

	/**
	 * Sets an `rdfs:label` in the given language.
	 * @param value - The label text.
	 * @param lang - The BCP 47 language tag.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setLabel("house", "en" as LanguageTag)
	 */
	setLabel(value: string, lang: LanguageTag): this {
		if (!this.data["rdfs:label"]) {
			this.data["rdfs:label"] = [];
		}
		this.data["rdfs:label"]!.push(langString(value, lang));
		return this;
	}

	/**
	 * Returns the built `LexicalEntry` plain object.
	 * @returns The constructed `LexicalEntry`.
	 *
	 * @example
	 * const entry = builder.build();
	 */
	build(): LexicalEntry {
		return { ...this.data };
	}
}
