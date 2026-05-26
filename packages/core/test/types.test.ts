import { test, expect, describe } from "bun:test";
import { mintURI, mintIRI, ETROG_NS_UUID } from "../src/types/uri.js";
import type { URI, LanguageTag, XSDDate } from "../src/types/index.js";

describe("URI branding", () => {
  test("URI is a string at runtime", () => {
    const uri = "urn:uuid:test" as URI;
    expect(typeof uri).toBe("string");
  });

  test("LanguageTag is a string at runtime", () => {
    const tag = "en" as LanguageTag;
    expect(typeof tag).toBe("string");
  });

  test("XSDDate is a string at runtime", () => {
    const date = "2024-01-01" as XSDDate;
    expect(typeof date).toBe("string");
  });
});

describe("ETROG_NS_UUID", () => {
  test("is the Etrog project namespace URN", () => {
    expect(ETROG_NS_UUID as string).toBe("urn:uuid:96f16397-6054-4c94-8ef6-c01603f158cc");
  });
});

describe("mintURI", () => {
  test("returns a urn:uuid: URN", async () => {
    const uri = await mintURI(ETROG_NS_UUID, "test");
    expect(uri).toMatch(/^urn:uuid:[0-9a-f-]{36}$/);
  });

  test("sets version bits to 5", async () => {
    const uri = await mintURI(ETROG_NS_UUID, "hello");
    // version nibble is the first character of the 3rd UUID group
    const parts = uri.replace("urn:uuid:", "").split("-");
    expect(parts[2][0]).toBe("5");
  });

  test("sets variant bits correctly", async () => {
    const uri = await mintURI(ETROG_NS_UUID, "hello");
    const parts = uri.replace("urn:uuid:", "").split("-");
    const variantByte = parseInt(parts[3].slice(0, 2), 16);
    // bits 6-7 should be 10 => 0x80–0xBF
    expect(variantByte & 0xc0).toBe(0x80);
  });

  test("is deterministic for the same inputs", async () => {
    const a = await mintURI(ETROG_NS_UUID, "stable");
    const b = await mintURI(ETROG_NS_UUID, "stable");
    expect(a).toBe(b);
  });

  test("produces different URIs for different inputs", async () => {
    const a = await mintURI(ETROG_NS_UUID, "foo");
    const b = await mintURI(ETROG_NS_UUID, "bar");
    expect(a).not.toBe(b);
  });
});

describe("mintIRI", () => {
  test("appends encoded local part to base", () => {
    const iri = mintIRI("https://example.org/lex/", "café");
    expect(iri as string).toBe("https://example.org/lex/caf%C3%A9");
  });

  test("plain ASCII local part is unchanged", () => {
    const iri = mintIRI("https://example.org/lex/", "house");
    expect(iri as string).toBe("https://example.org/lex/house");
  });
});
