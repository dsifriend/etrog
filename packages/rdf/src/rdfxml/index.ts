import * as N3 from "n3";
import { RdfXmlParser } from "rdfxml-streaming-parser";
import type { EtrogDataset, NamespaceMap } from "../types.js";

/**
 * Parses an RDF/XML document into an `EtrogDataset`.
 *
 * @param input - An RDF/XML string or a `ReadableStream` of RDF/XML text.
 * @param baseIri - Optional base IRI for resolving relative IRIs.
 * @returns A promise resolving to the parsed dataset.
 *
 * @example
 * const dataset = await parseRdfXml(`<?xml version="1.0"?>
 *   <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
 *   </rdf:RDF>`);
 */
export async function parseRdfXml(
	input: string | ReadableStream,
	baseIri?: string,
): Promise<EtrogDataset> {
	const text = typeof input === "string" ? input : await streamToString(input);

	return new Promise((resolve, reject) => {
		const store = new N3.Store();
		const parser = new RdfXmlParser({
			baseIRI: baseIri,
			dataFactory: N3.DataFactory,
		});

		parser.on("data", (quad) => {
			store.add(quad as N3.Quad);
		});
		parser.on("error", reject);
		parser.on("end", () => resolve({ store }));

		parser.write(text);
		parser.end();
	});
}

/**
 * Serializes an `EtrogDataset` to an RDF/XML string.
 *
 * Each quad is rendered as an `rdf:Description` element. This covers the
 * common case; complex RDF features (blank nodes as subjects in nested
 * descriptions) are rendered inline as resource attributes.
 *
 * @param dataset - The dataset to serialize.
 * @param prefixes - Optional namespace prefix map for `xmlns:` declarations.
 * @returns A promise resolving to the RDF/XML string.
 *
 * @example
 * const xml = await serializeRdfXml(dataset, { ex: "https://example.org/" });
 */
export async function serializeRdfXml(
	dataset: EtrogDataset,
	prefixes?: NamespaceMap,
): Promise<string> {
	// Include all standard OntoLex namespace prefixes by default
	const allPrefixes: NamespaceMap = {
		rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
		rdfs: "http://www.w3.org/2000/01/rdf-schema#",
		ontolex: "http://www.w3.org/ns/lemon/ontolex#",
		lime: "http://www.w3.org/ns/lemon/lime#",
		vartrans: "http://www.w3.org/ns/lemon/vartrans#",
		decomp: "http://www.w3.org/ns/lemon/decomp#",
		synsem: "http://www.w3.org/ns/lemon/synsem#",
		lexicog: "http://www.w3.org/ns/lemon/lexicog#",
		lexinfo: "http://www.lexinfo.net/ontology/3.0/lexinfo#",
		skos: "http://www.w3.org/2004/02/skos/core#",
		dcterms: "http://purl.org/dc/terms/",
		...(prefixes ?? {}),
	};

	// Build reverse map: URI → prefix for compacting predicate/type names
	const uriToPrefix = new Map<string, string>(
		Object.entries(allPrefixes).map(([p, u]) => [u, p]),
	);

	function xmlnsAttrs(): string {
		return Object.entries(allPrefixes)
			.map(([p, u]) => `xmlns:${p}="${escapeXml(u)}"`)
			.join("\n    ");
	}

	function compactUri(uri: string): { prefix: string; local: string } | null {
		for (const [nsUri, prefix] of uriToPrefix) {
			if (uri.startsWith(nsUri)) {
				return { prefix, local: uri.slice(nsUri.length) };
			}
		}
		return null;
	}

	function termToAttribute(uri: string): string {
		const compact = compactUri(uri);
		if (compact) {
			return `${compact.prefix}:${compact.local}`;
		}
		// If we can't compact the URI, we cannot use it as an XML element name.
		// Fall back to using rdf:value for the property and include the actual
		// predicate as rdf:about on a nested element. However, for simplicity,
		// we'll just use the full URI in an rdf:Description with rdf:predicate.
		// This is a limitation of the simple serialization approach.
		// For now, throw an error to make it clear this needs handling.
		throw new Error(
			`Cannot serialize predicate with no matching prefix: ${uri}. Add the namespace prefix to the prefixes parameter.`,
		);
	}

	const lines: string[] = [
		`<?xml version="1.0" encoding="UTF-8"?>`,
		"<rdf:RDF",
		`    ${xmlnsAttrs()}>`,
	];

	for (const quad of dataset.store) {
		const subject = quad.subject;
		const predicate = quad.predicate.value;
		const object = quad.object;

		const subjAttr =
			subject.termType === "BlankNode"
				? `rdf:nodeID="${escapeXml(subject.value)}"`
				: `rdf:about="${escapeXml(subject.value)}"`;

		const predAttr = termToAttribute(predicate);

		let objElement: string;
		if (object.termType === "NamedNode") {
			objElement = `  <${predAttr} rdf:resource="${escapeXml(object.value)}"/>`;
		} else if (object.termType === "BlankNode") {
			objElement = `  <${predAttr} rdf:nodeID="${escapeXml(object.value)}"/>`;
		} else {
			// Literal
			const lit = object as N3.Literal;
			const lang = lit.language;
			const dtype = lit.datatype?.value;
			if (lang) {
				objElement = `  <${predAttr} xml:lang="${escapeXml(lang)}">${escapeXml(lit.value)}</${predAttr}>`;
			} else if (dtype && dtype !== "http://www.w3.org/2001/XMLSchema#string") {
				objElement = `  <${predAttr} rdf:datatype="${escapeXml(dtype)}">${escapeXml(lit.value)}</${predAttr}>`;
			} else {
				objElement = `  <${predAttr}>${escapeXml(lit.value)}</${predAttr}>`;
			}
		}

		lines.push(`<rdf:Description ${subjAttr}>`);
		lines.push(objElement);
		lines.push("</rdf:Description>");
	}

	lines.push("</rdf:RDF>");
	return lines.join("\n");
}

/** Escapes special characters for XML attribute values and text nodes. */
function escapeXml(str: string): string {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

/** Reads a `ReadableStream` of text into a single string. */
async function streamToString(stream: ReadableStream): Promise<string> {
	const reader = stream.getReader();
	const decoder = new TextDecoder();
	const parts: string[] = [];
	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		parts.push(typeof value === "string" ? value : decoder.decode(value));
	}
	return parts.join("");
}
