import type { LexicographicComponent } from "../../lexicog/index.js";
import type { URI } from "../../types/index.js";

/**
 * Fluent builder for `lexicog:LexicographicComponent` objects.
 *
 * @example
 * const component = new LexicographicComponentBuilder("urn:uuid:component-1" as URI)
 *   .addSubComponent(subComponent)
 *   .build();
 */
export class LexicographicComponentBuilder {
	private readonly data: LexicographicComponent;

	/**
	 * Initialises the builder with the given URI as `@id`.
	 * @param id - The URI for this lexicographic component.
	 */
	constructor(id: URI) {
		this.data = {
			"@id": id,
			"@type": "lexicog:LexicographicComponent",
		};
	}

	/**
	 * Adds a sub-component (idempotent by `@id`).
	 * @param component - The `LexicographicComponent` to add.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addSubComponent(subComponent)
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
	 * Returns the built `LexicographicComponent` plain object.
	 * @returns The constructed `LexicographicComponent`.
	 *
	 * @example
	 * const component = builder.build();
	 */
	build(): LexicographicComponent {
		return { ...this.data };
	}
}
