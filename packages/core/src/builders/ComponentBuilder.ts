import type { Component } from "../decomp/index.js";
import type { URI } from "../types/index.js";

/**
 * Fluent builder for `decomp:Component` objects.
 *
 * @example
 * const component = new ComponentBuilder("urn:uuid:..." as URI)
 *   .setCorrespondsTo("urn:uuid:entry" as URI)
 *   .build();
 */
export class ComponentBuilder {
	private readonly data: Component;

	/**
	 * Initialises the builder with the given URI as `@id`.
	 * @param id - The URI for this component.
	 */
	constructor(id: URI) {
		this.data = {
			"@id": id,
			"@type": "decomp:Component",
		};
	}

	/**
	 * Sets the lexical entry this component corresponds to.
	 * @param entryUri - The URI of the corresponding `LexicalEntry`.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setCorrespondsTo("urn:uuid:entry" as URI)
	 */
	setCorrespondsTo(entryUri: URI): this {
		this.data["decomp:correspondsTo"] = entryUri;
		return this;
	}

	/**
	 * Returns the built `Component` plain object.
	 * @returns The constructed `Component`.
	 *
	 * @example
	 * const component = builder.build();
	 */
	build(): Component {
		return { ...this.data };
	}
}
