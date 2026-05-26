import type { URI } from "../types/index.js";

/**
 * A morphological component that is part of a decomposed lexical entry.
 * Corresponds to `decomp:Component` in the OntoLex-Lemon decomp module.
 */
export interface Component {
  "@id": URI;
  "@type": "decomp:Component" | URI;
  /** Link to the `LexicalEntry` this component corresponds to. */
  "decomp:correspondsTo"?: URI;
}
