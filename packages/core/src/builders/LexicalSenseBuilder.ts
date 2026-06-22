import { langString } from "../langstring.js";
import type { UsageExample } from "../lexicog/index.js";
import type { LexInfoRegister } from "../lexinfo/index.js";
import type { LexicalEntry, LexicalSense, Usage } from "../ontolex/index.js";
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
		this.data["skos:definition"] ??= [];
		const definitions = this.data["skos:definition"];
		definitions.push(langString(value, lang));
		return this;
	}

	/**
	 * Adds a usage note (idempotent by `@id`).
	 * @param usage - The `Usage` object to add.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addUsage(usage)
	 */
	addUsage(usage: Usage): this {
		this.data["ontolex:usage"] ??= [];
		const existing = this.data["ontolex:usage"];
		if (!existing.some((u) => u["@id"] === usage["@id"])) {
			existing.push(usage);
		}
		return this;
	}

	/**
	 * Adds a usage note with a literal value.
	 * @param id - URI of the usage node.
	 * @param value - The usage note text.
	 * @param lang - The BCP 47 language tag.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addUsageValue("urn:uuid:usage-1" as URI, "archaic", "en" as LanguageTag)
	 */
	addUsageValue(id: URI, value: string, lang: LanguageTag): this {
		return this.addUsage({
			"@id": id,
			"@type": "ontolex:Usage",
			"rdf:value": [langString(value, lang)],
		});
	}

	/**
	 * Adds an inverse sense link (idempotent by `@id`).
	 * @param entry - The `LexicalEntry` this sense belongs to.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addIsSenseOf(entry)
	 */
	addIsSenseOf(entry: LexicalEntry): this {
		this.data["ontolex:isSenseOf"] ??= [];
		const existing = this.data["ontolex:isSenseOf"];
		if (!existing.some((e) => e["@id"] === entry["@id"])) {
			existing.push(entry);
		}
		return this;
	}

	/**
	 * Adds a LexInfo usage register value (idempotent).
	 * @param register - A `LexInfoRegister` URI.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addRegister(LexInfoRegister.vulgarRegister)
	 */
	addRegister(register: LexInfoRegister): this {
		this.data["lexinfo:register"] ??= [];
		const registers = this.data["lexinfo:register"];
		if (!registers.includes(register)) {
			registers.push(register);
		}
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
		this.data["lexicog:usageExample"] ??= [];
		const existing = this.data["lexicog:usageExample"];
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
		this.data["vartrans:senseRel"] ??= [];
		const existing = this.data["vartrans:senseRel"];
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
		this.data["vartrans:translation"] ??= [];
		const existing = this.data["vartrans:translation"];
		if (!existing.some((t) => t["@id"] === tr["@id"])) {
			existing.push(tr);
		}
		return this;
	}

	/**
	 * Adds a direct sense relation shortcut URI (idempotent).
	 * @param targetUri - URI of the related sense.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addRelates("urn:uuid:sense-b" as URI)
	 */
	addRelates(targetUri: URI): this {
		this.data["vartrans:relates"] ??= [];
		const relates = this.data["vartrans:relates"];
		if (!relates.includes(targetUri)) {
			relates.push(targetUri);
		}
		return this;
	}

	/**
	 * Adds a direct translatable-as shortcut URI (idempotent).
	 * @param targetUri - URI of the translatable sense.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addTranslatableAs("urn:uuid:sense-maison" as URI)
	 */
	addTranslatableAs(targetUri: URI): this {
		this.data["vartrans:translatableAs"] ??= [];
		const translatableAs = this.data["vartrans:translatableAs"];
		if (!translatableAs.includes(targetUri)) {
			translatableAs.push(targetUri);
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
