import type { ConceptualizationSet } from "../lime/index.js";
import type { ConceptSet } from "../ontolex/index.js";
import type { URI } from "../types/index.js";

/**
 * Fluent builder for `lime:ConceptualizationSet` objects.
 *
 * @example
 * const set = new ConceptualizationSetBuilder("urn:uuid:cs-1" as URI)
 *   .setLexiconDataset("https://example.org/lexicon" as URI)
 *   .setConceptualDataset("https://example.org/concepts" as URI)
 *   .build();
 */
export class ConceptualizationSetBuilder {
	private readonly data: ConceptualizationSet;

	/**
	 * Initialises the builder with the given URI as `@id`.
	 * @param id - The URI for this conceptualization set.
	 */
	constructor(id: URI) {
		this.data = {
			"@id": id,
			"@type": "lime:ConceptualizationSet",
		};
	}

	/**
	 * Sets the lexicon dataset URI.
	 * @param uri - The lexicon dataset URI.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setLexiconDataset("https://example.org/lexicon" as URI)
	 */
	setLexiconDataset(uri: URI): this {
		this.data["lime:lexiconDataset"] = uri;
		return this;
	}

	/**
	 * Sets the conceptual dataset reference.
	 * @param dataset - The concept set URI or object.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setConceptualDataset("https://example.org/concepts" as URI)
	 */
	setConceptualDataset(dataset: ConceptSet | URI): this {
		this.data["lime:conceptualDataset"] = dataset;
		return this;
	}

	/**
	 * Sets the number of lexical entries involved.
	 * @param count - The lexical entry count.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setLexicalEntries(155287)
	 */
	setLexicalEntries(count: number): this {
		this.data["lime:lexicalEntries"] = count;
		return this;
	}

	/**
	 * Sets the number of concepts involved.
	 * @param count - The concept count.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setConcepts(117659)
	 */
	setConcepts(count: number): this {
		this.data["lime:concepts"] = count;
		return this;
	}

	/**
	 * Sets the number of conceptualizations.
	 * @param count - The conceptualization count.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setConceptualizations(206941)
	 */
	setConceptualizations(count: number): this {
		this.data["lime:conceptualizations"] = count;
		return this;
	}

	/**
	 * Sets the average ambiguity value.
	 * @param value - The average ambiguity.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setAvgAmbiguity(1.33)
	 */
	setAvgAmbiguity(value: number): this {
		this.data["lime:avgAmbiguity"] = value;
		return this;
	}

	/**
	 * Sets the average synonymy value.
	 * @param value - The average synonymy.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setAvgSynonymy(1.76)
	 */
	setAvgSynonymy(value: number): this {
		this.data["lime:avgSynonymy"] = value;
		return this;
	}

	/**
	 * Returns the built `ConceptualizationSet` plain object.
	 * @returns The constructed `ConceptualizationSet`.
	 *
	 * @example
	 * const set = builder.build();
	 */
	build(): ConceptualizationSet {
		return { ...this.data };
	}
}
