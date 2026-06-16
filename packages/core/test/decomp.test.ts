import { describe, expect, test } from "bun:test";
import type { Component } from "../src/decomp/index.js";
import type { URI } from "../src/types/index.js";

describe("Component interface", () => {
	test("minimal valid Component", () => {
		const comp: Component = {
			"@id": "urn:uuid:comp-1" as URI,
			"@type": "decomp:Component",
		};
		expect(comp["@id"] as string).toBe("urn:uuid:comp-1");
		expect(comp["@type"]).toBe("decomp:Component");
	});

	test("Component with correspondsTo", () => {
		const comp: Component = {
			"@id": "urn:uuid:comp-2" as URI,
			"@type": "decomp:Component",
			"decomp:correspondsTo": "urn:uuid:entry-1" as URI,
		};
		expect(comp["decomp:correspondsTo"] as string).toBe("urn:uuid:entry-1");
	});
});
