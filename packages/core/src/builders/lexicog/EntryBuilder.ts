import type { Entry, LexicographicComponent } from "../../lexicog/index.js";
import type { URI } from "../../types/index.js";

/**
 * Fluent builder for `lexicog:Entry` objects.
 *
 * @example
 * const entry = new EntryBuilder("urn:uuid:entry-1" as URI)
 *   .setDescribes("urn:uuid:lexical-entry-1" as URI)
 *   .addSubComponent(component)
 *   .build();
 */
export class EntryBuilder {
	private readonly data: Entry;

	/**
	 * Initialises the builder with the given URI as `@id`.
	 * @param id - The URI for this lexicographic entry.
	 */
	constructor(id: URI) {
		this.data = {
			"@id": id,
			"@type": "lexicog:Entry",
		};
	}

	/**
	 * Sets the lexical entry being described.
	 * @param entryUri - URI of the `LexicalEntry`.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setDescribes("urn:uuid:lexical-entry-1" as URI)
	 */
	setDescribes(entryUri: URI): this {
		this.data["lexicog:describes"] = entryUri;
		return this;
	}

	/**
	 * Adds a sub-component (idempotent by `@id`).
	 * @param component - The `LexicographicComponent` to add.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addSubComponent(component)
	 */
	addSubComponent(component: LexicographicComponent): this {
		this.data["lexicog:subComponent"] ??= [];
		const subComponents = this.data["lexicog:subComponent"];
		if (!subComponents.some((c) => c["@id"] === component["@id"])) {
			subComponents.push(component);
		}
		return this;
	}

	/**
	 * Returns the built `Entry` plain object.
	 * @returns The constructed `Entry`.
	 *
	 * @example
	 * const entry = builder.build();
	 */
	build(): Entry {
		return { ...this.data };
	}
}
