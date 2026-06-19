import { langString } from "../langstring.js";
import type {
	LexicalConcept,
	LexicalEntry,
	LexicalSense,
} from "../ontolex/index.js";
import type { LanguageTag, URI } from "../types/index.js";
import type { ConceptualRelation } from "../vartrans/index.js";

/**
 * Fluent builder for `ontolex:LexicalConcept` objects.
 *
 * @example
 * const concept = new LexicalConceptBuilder("urn:uuid:..." as URI)
 *   .addDefinition("A place to live", "en" as LanguageTag)
 *   .build();
 */
export class LexicalConceptBuilder {
	private readonly data: LexicalConcept;

	/**
	 * Initialises the builder with the given URI as `@id`.
	 * @param id - The URI for this lexical concept.
	 */
	constructor(id: URI) {
		this.data = {
			"@id": id,
			"@type": "ontolex:LexicalConcept",
		};
	}

	/**
	 * Adds a definition in the given language.
	 * @param value - The definition text.
	 * @param lang - The BCP 47 language tag.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addDefinition("A place to live", "en" as LanguageTag)
	 */
	addDefinition(value: string, lang: LanguageTag): this {
		this.data["skos:definition"] ??= [];
		const definitions = this.data["skos:definition"];
		definitions.push(langString(value, lang));
		return this;
	}

	/**
	 * Adds a preferred label in the given language.
	 * @param value - The label text.
	 * @param lang - The BCP 47 language tag.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addPrefLabel("house", "en" as LanguageTag)
	 */
	addPrefLabel(value: string, lang: LanguageTag): this {
		this.data["skos:prefLabel"] ??= [];
		const labels = this.data["skos:prefLabel"];
		labels.push(langString(value, lang));
		return this;
	}

	/**
	 * Adds an alternative label in the given language.
	 * @param value - The label text.
	 * @param lang - The BCP 47 language tag.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addAltLabel("dwelling", "en" as LanguageTag)
	 */
	addAltLabel(value: string, lang: LanguageTag): this {
		this.data["skos:altLabel"] ??= [];
		const labels = this.data["skos:altLabel"];
		labels.push(langString(value, lang));
		return this;
	}

	/**
	 * Adds a link to an ontological entity (idempotent).
	 * @param uri - URI of the ontology entity.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addIsConceptOf("https://dbpedia.org/resource/House" as URI)
	 */
	addIsConceptOf(uri: URI): this {
		this.data["ontolex:isConceptOf"] ??= [];
		const targets = this.data["ontolex:isConceptOf"];
		if (!targets.includes(uri)) {
			targets.push(uri);
		}
		return this;
	}

	/**
	 * Adds a lexicalized sense (idempotent by `@id`).
	 * @param sense - The `LexicalSense` to add.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addLexicalizedSense(sense)
	 */
	addLexicalizedSense(sense: LexicalSense): this {
		this.data["ontolex:lexicalizedSense"] ??= [];
		const existing = this.data["ontolex:lexicalizedSense"];
		if (!existing.some((s) => s["@id"] === sense["@id"])) {
			existing.push(sense);
		}
		return this;
	}

	/**
	 * Adds an entry that evokes this concept (idempotent by `@id`).
	 * @param entry - The `LexicalEntry` to add.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addIsEvokedBy(entry)
	 */
	addIsEvokedBy(entry: LexicalEntry): this {
		this.data["ontolex:isEvokedBy"] ??= [];
		const existing = this.data["ontolex:isEvokedBy"];
		if (!existing.some((e) => e["@id"] === entry["@id"])) {
			existing.push(entry);
		}
		return this;
	}

	/**
	 * Adds a conceptual relation (idempotent by `@id`).
	 * @param rel - The `ConceptualRelation` to add.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addConceptRelation(rel)
	 */
	addConceptRelation(rel: ConceptualRelation): this {
		this.data["vartrans:conceptRel"] ??= [];
		const existing = this.data["vartrans:conceptRel"];
		if (!existing.some((r) => r["@id"] === rel["@id"])) {
			existing.push(rel);
		}
		return this;
	}

	/**
	 * Returns the built `LexicalConcept` plain object.
	 * @returns The constructed `LexicalConcept`.
	 *
	 * @example
	 * const concept = builder.build();
	 */
	build(): LexicalConcept {
		return { ...this.data };
	}
}
