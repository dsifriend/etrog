import type { LexicalizationSet } from "../lime/index.js";
import type { LanguageTag, URI } from "../types/index.js";

/**
 * Fluent builder for `lime:LexicalizationSet` objects.
 *
 * @example
 * const set = new LexicalizationSetBuilder("urn:uuid:ls-1" as URI, "en" as LanguageTag)
 *   .setReferenceDataset("https://example.org/ontology" as URI)
 *   .setLexiconDataset("https://example.org/lexicon" as URI)
 *   .setLexicalizationModel("http://www.w3.org/ns/lemon/ontolex#" as URI)
 *   .build();
 */
export class LexicalizationSetBuilder {
	private readonly data: LexicalizationSet;

	/**
	 * Initialises the builder with the given URI and language.
	 * @param id - The URI for this lexicalization set.
	 * @param language - The BCP 47 language tag for the set.
	 */
	constructor(id: URI, language: LanguageTag) {
		this.data = {
			"@id": id,
			"@type": "lime:LexicalizationSet",
			"lime:language": language,
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
	 * Sets the reference dataset URI.
	 * @param uri - The reference dataset URI.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setReferenceDataset("https://example.org/ontology" as URI)
	 */
	setReferenceDataset(uri: URI): this {
		this.data["lime:referenceDataset"] = uri;
		return this;
	}

	/**
	 * Sets the lexicalization model URI.
	 * @param uri - The lexicalization model URI.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setLexicalizationModel("http://www.w3.org/ns/lemon/ontolex#" as URI)
	 */
	setLexicalizationModel(uri: URI): this {
		this.data["lime:lexicalizationModel"] = uri;
		return this;
	}

	/**
	 * Sets the number of distinct ontology elements referenced.
	 * @param count - The reference count.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setReferences(20)
	 */
	setReferences(count: number): this {
		this.data["lime:references"] = count;
		return this;
	}

	/**
	 * Sets the total number of lexicalizations.
	 * @param count - The lexicalization count.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setLexicalizations(50)
	 */
	setLexicalizations(count: number): this {
		this.data["lime:lexicalizations"] = count;
		return this;
	}

	/**
	 * Sets the average number of lexicalizations per ontology element.
	 * @param value - The average value.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setAvgNumOfLexicalizations(0.66)
	 */
	setAvgNumOfLexicalizations(value: number): this {
		this.data["lime:avgNumOfLexicalizations"] = value;
		return this;
	}

	/**
	 * Sets the number of lexical entries involved in the set.
	 * @param count - The lexical entry count.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setLexicalEntries(15)
	 */
	setLexicalEntries(count: number): this {
		this.data["lime:lexicalEntries"] = count;
		return this;
	}

	/**
	 * Sets the percentage of reference dataset entities lexicalized.
	 * @param value - The percentage value.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setPercentage(0.4)
	 */
	setPercentage(value: number): this {
		this.data["lime:percentage"] = value;
		return this;
	}

	/**
	 * Sets the resource type URI for this partitioned set.
	 * @param uri - The resource type URI.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setResourceType("http://www.w3.org/2002/07/owl#Class" as URI)
	 */
	setResourceType(uri: URI): this {
		this.data["lime:resourceType"] = uri;
		return this;
	}

	/**
	 * Adds a partition (idempotent by `@id` or URI).
	 * @param partition - The partition set or its URI.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addPartition("urn:uuid:partition-1" as URI)
	 */
	addPartition(partition: LexicalizationSet | URI): this {
		this.data["lime:partition"] ??= [];
		const partitions = this.data["lime:partition"];
		const id = typeof partition === "string" ? partition : partition["@id"];
		const exists = partitions.some((item) =>
			typeof item === "string" ? item === id : item["@id"] === id,
		);
		if (!exists) {
			partitions.push(partition);
		}
		return this;
	}

	/**
	 * Returns the built `LexicalizationSet` plain object.
	 * @returns The constructed `LexicalizationSet`.
	 *
	 * @example
	 * const set = builder.build();
	 */
	build(): LexicalizationSet {
		return {
			...this.data,
			"lime:partition": this.data["lime:partition"]
				? [...this.data["lime:partition"]]
				: undefined,
		};
	}
}
