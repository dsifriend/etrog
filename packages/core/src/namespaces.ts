import type { JsonLdContext } from "./types/index.js";

/** Mapping of well-known namespace prefixes to their full URI strings. */
export const Namespaces = {
	ontolex: "http://www.w3.org/ns/lemon/ontolex#",
	lime: "http://www.w3.org/ns/lemon/lime#",
	vartrans: "http://www.w3.org/ns/lemon/vartrans#",
	decomp: "http://www.w3.org/ns/lemon/decomp#",
	synsem: "http://www.w3.org/ns/lemon/synsem#",
	lexicog: "http://www.w3.org/ns/lemon/lexicog#",
	lexinfo: "http://www.lexinfo.net/ontology/3.0/lexinfo#",
	skos: "http://www.w3.org/2004/02/skos/core#",
	wn: "https://globalwordnet.github.io/schemas/wn#",
	dbnary: "http://kaiko.getalp.org/dbnary#",
	dcterms: "http://purl.org/dc/terms/",
	owl: "http://www.w3.org/2002/07/owl#",
	rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
	rdfs: "http://www.w3.org/2000/01/rdf-schema#",
} as const;

/** Union of all supported namespace prefixes. */
export type NamespacePrefix = keyof typeof Namespaces;

/**
 * Returns a `"prefix:local"` qualified name string.
 *
 * @param prefix - A known namespace prefix from `Namespaces`.
 * @param local - The local name.
 * @returns The qualified name string.
 *
 * @example
 * qname("ontolex", "LexicalEntry") // => "ontolex:LexicalEntry"
 */
export function qname(prefix: NamespacePrefix, local: string): string {
	return `${prefix}:${local}`;
}

/**
 * The canonical Etrog JSON-LD `@context` object.
 * Includes all standard namespace prefixes and shorthand property aliases.
 */
export const DEFAULT_CONTEXT: JsonLdContext = {
	"@context": {
		ontolex: Namespaces.ontolex,
		lime: Namespaces.lime,
		vartrans: Namespaces.vartrans,
		decomp: Namespaces.decomp,
		synsem: Namespaces.synsem,
		lexicog: Namespaces.lexicog,
		lexinfo: Namespaces.lexinfo,
		skos: Namespaces.skos,
		wn: Namespaces.wn,
		dbnary: Namespaces.dbnary,
		dcterms: Namespaces.dcterms,
		owl: Namespaces.owl,
		rdf: Namespaces.rdf,
		rdfs: Namespaces.rdfs,

		language: "lime:language",
		canonicalForm: { "@id": "ontolex:canonicalForm", "@type": "@id" },
		otherForm: { "@id": "ontolex:otherForm", "@type": "@id" },
		sense: { "@id": "ontolex:sense", "@type": "@id" },
		writtenRep: "ontolex:writtenRep",
		entry: { "@id": "lime:entry", "@type": "@id" },
	},
};
