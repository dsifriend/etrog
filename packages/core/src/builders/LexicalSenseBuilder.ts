import { langString } from "../langstring.js";
import type { UsageExample } from "../lexicog/index.js";
import type { LexicalSense } from "../ontolex/index.js";
import type { LanguageTag, URI } from "../types/index.js";
import type { SenseRelation, Translation } from "../vartrans/index.js";

/**
 * Fluent builder for `ontolex:LexicalSense` objects.
 *
 * @example
 * const sense = new LexicalSenseBuilder("urn:uuid:..." as URI)
 *   .setReference("https://example.org/concept/1" as URI)
 *   .addDefinition("A dwelling place", "en" as LanguageTag)
 *   .build();
 */
export class LexicalSenseBuilder {
	private readonly data: LexicalSense;

	/**
	 * Initialises the builder with the given URI as `@id`.
	 * @param id - The URI for this sense.
	 */
	constructor(id: URI) {
		this.data = {
			"@id": id,
			"@type": "ontolex:LexicalSense",
		};
	}

	/**
	 * Sets the ontological reference for this sense.
	 * @param ref - URI of the ontological entity this sense refers to.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setReference("https://dbpedia.org/resource/House" as URI)
	 */
	setReference(ref: URI): this {
		this.data["ontolex:reference"] = ref;
		return this;
	}

	/**
	 * Sets the lexical concept this sense is a lexicalization of.
	 * @param conceptId - URI of the `LexicalConcept`.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setConceptLink("urn:uuid:..." as URI)
	 */
	setConceptLink(conceptId: URI): this {
		this.data["ontolex:isLexicalizedSenseOf"] = conceptId;
		return this;
	}

	/**
	 * Adds a definition in the given language.
	 * @param value - The definition text.
	 * @param lang - The BCP 47 language tag.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addDefinition("A building for human habitation", "en" as LanguageTag)
	 */
	addDefinition(value: string, lang: LanguageTag): this {
		if (!this.data["skos:definition"]) {
			this.data["skos:definition"] = [];
		}
		this.data["skos:definition"]!.push(langString(value, lang));
		return this;
	}

	/**
	 * Adds a usage example (idempotent by `@id`).
	 * @param ex - The `UsageExample` object.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addUsageExample(ex)
	 */
	addUsageExample(ex: UsageExample): this {
		if (!this.data["lexicog:usageExample"]) {
			this.data["lexicog:usageExample"] = [];
		}
		const existing = this.data["lexicog:usageExample"]!;
		if (!existing.some((e) => e["@id"] === ex["@id"])) {
			existing.push(ex);
		}
		return this;
	}

	/**
	 * Adds a sense relation (idempotent by `@id`).
	 * @param rel - The `SenseRelation` to add.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addSenseRelation(rel)
	 */
	addSenseRelation(rel: SenseRelation): this {
		if (!this.data["vartrans:senseRel"]) {
			this.data["vartrans:senseRel"] = [];
		}
		const existing = this.data["vartrans:senseRel"]!;
		if (!existing.some((r) => r["@id"] === rel["@id"])) {
			existing.push(rel);
		}
		return this;
	}

	/**
	 * Adds a translation relation (idempotent by `@id`).
	 * @param tr - The `Translation` to add.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addTranslation(tr)
	 */
	addTranslation(tr: Translation): this {
		if (!this.data["vartrans:translation"]) {
			this.data["vartrans:translation"] = [];
		}
		const existing = this.data["vartrans:translation"]!;
		if (!existing.some((t) => t["@id"] === tr["@id"])) {
			existing.push(tr);
		}
		return this;
	}

	/**
	 * Returns the built `LexicalSense` plain object.
	 * @returns The constructed `LexicalSense`.
	 *
	 * @example
	 * const sense = builder.build();
	 */
	build(): LexicalSense {
		return { ...this.data };
	}
}
