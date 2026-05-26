import type { Store } from "n3";

/**
 * Wraps an N3 Store; represents a parsed RDF graph.
 */
export interface EtrogDataset {
	store: Store;
}

/**
 * A mapping of namespace prefixes to their full URI strings.
 * Used when serializing RDF to include human-readable prefix declarations.
 */
export type NamespaceMap = Record<string, string>;
