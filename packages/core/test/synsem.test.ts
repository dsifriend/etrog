import { test, expect, describe } from "bun:test";
import type {
  SyntacticFrame,
  SyntacticArgument,
  OntoMap,
} from "../src/synsem/index.js";
import type { URI } from "../src/types/index.js";

describe("SyntacticFrame interface", () => {
  test("minimal valid SyntacticFrame", () => {
    const frame: SyntacticFrame = {
      "@id": "urn:uuid:frame-1" as URI,
      "@type": "synsem:SyntacticFrame",
    };
    expect(frame["@type"]).toBe("synsem:SyntacticFrame");
  });
});

describe("SyntacticArgument interface", () => {
  test("minimal valid SyntacticArgument", () => {
    const arg: SyntacticArgument = {
      "@id": "urn:uuid:arg-1" as URI,
      "@type": "synsem:SyntacticArgument",
    };
    expect(arg["@type"]).toBe("synsem:SyntacticArgument");
  });
});

describe("OntoMap interface", () => {
  test("minimal valid OntoMap", () => {
    const om: OntoMap = {
      "@id": "urn:uuid:onto-1" as URI,
      "@type": "synsem:OntoMap",
    };
    expect(om["@type"]).toBe("synsem:OntoMap");
  });
});
