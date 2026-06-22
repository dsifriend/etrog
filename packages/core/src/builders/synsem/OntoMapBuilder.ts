import type { OntoMap } from "../../synsem/index.js";
import type { URI } from "../../types/index.js";

/**
 * Fluent builder for `synsem:OntoMap` objects.
 *
 * @example
 * const map = new OntoMapBuilder("urn:uuid:map-1" as URI)
 *   .setSubjOfProp("http://example.org/ontology#hasOwner" as URI)
 *   .setObjOfProp("http://example.org/ontology#Owner" as URI)
 *   .setOntoMapping("urn:uuid:sense-1" as URI)
 *   .build();
 */
export class OntoMapBuilder {
	private readonly data: OntoMap;

	/**
	 * Initialises the builder with the given URI as `@id`.
	 * @param id - The URI for this ontology mapping.
	 */
	constructor(id: URI) {
		this.data = {
			"@id": id,
			"@type": "synsem:OntoMap",
		};
	}

	/**
	 * Sets the subject of the mapped property.
	 * @param uri - URI of the property subject.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setSubjOfProp("http://example.org/ontology#hasOwner" as URI)
	 */
	setSubjOfProp(uri: URI): this {
		this.data["synsem:subjOfProp"] = uri;
		return this;
	}

	/**
	 * Sets the object of the mapped property.
	 * @param uri - URI of the property object.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setObjOfProp("http://example.org/ontology#Owner" as URI)
	 */
	setObjOfProp(uri: URI): this {
		this.data["synsem:objOfProp"] = uri;
		return this;
	}

	/**
	 * Links this OntoMap to its corresponding lexical sense.
	 * @param senseUri - URI of the lexical sense.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setOntoMapping("urn:uuid:sense-1" as URI)
	 */
	setOntoMapping(senseUri: URI): this {
		this.data["synsem:ontoMapping"] = senseUri;
		return this;
	}

	/**
	 * Adds a sub-mapping for complex multi-predicate mappings (idempotent by `@id`).
	 * @param submap - The `OntoMap` submap to add.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addSubmap(submapObject)
	 */
	addSubmap(submap: OntoMap): this {
		this.data["synsem:submap"] ??= [];
		const submaps = this.data["synsem:submap"];
		if (!submaps.some((sm) => sm["@id"] === submap["@id"])) {
			submaps.push(submap);
		}
		return this;
	}

	/**
	 * Returns the built `OntoMap` plain object.
	 * @returns The constructed `OntoMap`.
	 *
	 * @example
	 * const map = builder.build();
	 */
	build(): OntoMap {
		return { ...this.data };
	}
}
