import type {
	OntoMap,
	SyntacticArgument,
	SyntacticFrame,
} from "../../synsem/index.js";
import type { URI } from "../../types/index.js";

/**
 * Fluent builder for `synsem:SyntacticFrame` objects.
 *
 * @example
 * const frame = new SyntacticFrameBuilder("urn:uuid:frame-1" as URI)
 *   .addSynArg(argument)
 *   .addOntoCorrespondence(ontoMap)
 *   .build();
 */
export class SyntacticFrameBuilder {
	private readonly data: SyntacticFrame;

	/**
	 * Initialises the builder with the given URI as `@id`.
	 * @param id - The URI for this syntactic frame.
	 */
	constructor(id: URI) {
		this.data = {
			"@id": id,
			"@type": "synsem:SyntacticFrame",
		};
	}

	/**
	 * Adds a syntactic argument to this frame (idempotent by `@id`).
	 * @param arg - The `SyntacticArgument` to add.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addSynArg(argument)
	 */
	addSynArg(arg: SyntacticArgument): this {
		this.data["synsem:synArg"] ??= [];
		const synArgs = this.data["synsem:synArg"];
		if (!synArgs.some((a) => a["@id"] === arg["@id"])) {
			synArgs.push(arg);
		}
		return this;
	}

	/**
	 * Adds an ontology correspondence mapping (idempotent by `@id`).
	 * @param map - The `OntoMap` to add.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addOntoCorrespondence(ontoMap)
	 */
	addOntoCorrespondence(map: OntoMap): this {
		this.data["synsem:ontoCorrespondence"] ??= [];
		const correspondences = this.data["synsem:ontoCorrespondence"];
		if (!correspondences.some((m) => m["@id"] === map["@id"])) {
			correspondences.push(map);
		}
		return this;
	}

	/**
	 * Returns the built `SyntacticFrame` plain object.
	 * @returns The constructed `SyntacticFrame`.
	 *
	 * @example
	 * const frame = builder.build();
	 */
	build(): SyntacticFrame {
		return { ...this.data };
	}
}
