import { test, expect, describe } from "bun:test";
import { Namespaces, qname, DEFAULT_CONTEXT } from "../src/namespaces.js";

describe("Namespaces", () => {
	test("ontolex URI is correct", () => {
		expect(Namespaces.ontolex).toBe("http://www.w3.org/ns/lemon/ontolex#");
	});

	test("lime URI is correct", () => {
		expect(Namespaces.lime).toBe("http://www.w3.org/ns/lemon/lime#");
	});

	test("lexinfo URI is correct", () => {
		expect(Namespaces.lexinfo).toBe(
			"http://www.lexinfo.net/ontology/3.0/lexinfo#",
		);
	});

	test("all 14 namespaces are defined", () => {
		const keys = Object.keys(Namespaces);
		expect(keys).toHaveLength(14);
	});
});

describe("qname", () => {
	test("returns prefix:local", () => {
		expect(qname("ontolex", "LexicalEntry")).toBe("ontolex:LexicalEntry");
	});

	test("works for all prefixes", () => {
		for (const prefix of Object.keys(
			Namespaces,
		) as (keyof typeof Namespaces)[]) {
			expect(qname(prefix, "Test")).toBe(`${prefix}:Test`);
		}
	});
});

describe("DEFAULT_CONTEXT", () => {
	test("has @context key", () => {
		expect(DEFAULT_CONTEXT).toHaveProperty("@context");
	});

	test("@context contains ontolex prefix", () => {
		const ctx = DEFAULT_CONTEXT["@context"] as Record<string, unknown>;
		expect(ctx["ontolex"]).toBe(Namespaces.ontolex);
	});

	test("@context contains shorthand aliases", () => {
		const ctx = DEFAULT_CONTEXT["@context"] as Record<string, unknown>;
		expect(ctx["language"]).toBe("lime:language");
		expect(ctx["writtenRep"]).toBe("ontolex:writtenRep");
	});

	test("canonicalForm alias has @type @id", () => {
		const ctx = DEFAULT_CONTEXT["@context"] as Record<string, unknown>;
		const cf = ctx["canonicalForm"] as Record<string, string>;
		expect(cf["@id"]).toBe("ontolex:canonicalForm");
		expect(cf["@type"]).toBe("@id");
	});
});
