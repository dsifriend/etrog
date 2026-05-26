import type { TranslationSet, Translation } from "../../vartrans/index.js";
import type { URI } from "../../types/index.js";

/**
 * Fluent builder for `vartrans:TranslationSet` objects.
 *
 * @example
 * const set = new TranslationSetBuilder("urn:uuid:..." as URI)
 *   .addTranslation(tr)
 *   .build();
 */
export class TranslationSetBuilder {
  private readonly data: TranslationSet;

  /**
   * Initialises the builder with the given URI as `@id`.
   * @param id - The URI for this translation set.
   */
  constructor(id: URI) {
    this.data = {
      "@id": id,
      "@type": "vartrans:TranslationSet",
      "vartrans:trans": [],
    };
  }

  /**
   * Adds a translation to this set (idempotent by `@id`).
   * @param tr - The `Translation` to add.
   * @returns `this` for chaining.
   *
   * @example
   * builder.addTranslation(tr)
   */
  addTranslation(tr: Translation): this {
    const existing = this.data["vartrans:trans"]!;
    if (!existing.some((t) => t["@id"] === tr["@id"])) {
      existing.push(tr);
    }
    return this;
  }

  /**
   * Sets the source dataset URI for this translation set.
   * @param s - The source `URI`.
   * @returns `this` for chaining.
   *
   * @example
   * builder.setSource("https://example.org/corpus" as URI)
   */
  setSource(s: URI): this {
    this.data["dcterms:source"] = s;
    return this;
  }

  /**
   * Returns the built `TranslationSet` plain object.
   * @returns The constructed `TranslationSet`.
   *
   * @example
   * const set = builder.build();
   */
  build(): TranslationSet {
    return { ...this.data, "vartrans:trans": [...(this.data["vartrans:trans"] ?? [])] };
  }
}
