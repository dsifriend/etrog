import type { LexicalLinkset } from "../lime/index.js";
import type { ConceptSet } from "../ontolex/index.js";
import type { URI } from "../types/index.js";

/**
 * Fluent builder for `lime:LexicalLinkset` objects.
 *
 * @example
 * const linkset = new LexicalLinksetBuilder("urn:uuid:ll-1" as URI)
 *   .setReferenceDataset("https://example.org/ontology" as URI)
 *   .setConceptualDataset("https://example.org/concepts" as URI)
 *   .build();
 */
export class LexicalLinksetBuilder {
	private readonly data: LexicalLinkset;

	/**
	 * Initialises the builder with the given URI as `@id`.
	 * @param id - The URI for this lexical linkset.
	 */
	constructor(id: URI) {
		this.data = {
			"@id": id,
			"@type": "lime:LexicalLinkset",
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
	 * Sets the target dataset URI.
	 * @param uri - The target dataset URI.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setTargetDataset("https://example.org/target" as URI)
	 */
	setTargetDataset(uri: URI): this {
		this.data["lime:targetDataset"] = uri;
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
	 * Sets the number of concepts involved.
	 * @param count - The concept count.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setConcepts(120)
	 */
	setConcepts(count: number): this {
		this.data["lime:concepts"] = count;
		return this;
	}

	/**
	 * Sets the number of links.
	 * @param count - The link count.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setLinks(240)
	 */
	setLinks(count: number): this {
		this.data["lime:links"] = count;
		return this;
	}

	/**
	 * Sets the average number of links per reference dataset element.
	 * @param value - The average value.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setAvgNumOfLinks(0.75)
	 */
	setAvgNumOfLinks(value: number): this {
		this.data["lime:avgNumOfLinks"] = value;
		return this;
	}

	/**
	 * Sets the resource type URI for this partitioned linkset.
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
	 * @param partition - The partition linkset or its URI.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addPartition("urn:uuid:partition-1" as URI)
	 */
	addPartition(partition: LexicalLinkset | URI): this {
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
	 * Returns the built `LexicalLinkset` plain object.
	 * @returns The constructed `LexicalLinkset`.
	 *
	 * @example
	 * const linkset = builder.build();
	 */
	build(): LexicalLinkset {
		return {
			...this.data,
			"lime:partition": this.data["lime:partition"]
				? [...this.data["lime:partition"]]
				: undefined,
		};
	}
}
