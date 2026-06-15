import { test, expect, describe } from "bun:test";
import { FormBuilder } from "../src/builders/FormBuilder.js";
import { LexicalSenseBuilder } from "../src/builders/LexicalSenseBuilder.js";
import { LexicalEntryBuilder } from "../src/builders/LexicalEntryBuilder.js";
import { LexiconBuilder } from "../src/builders/LexiconBuilder.js";
import { SenseRelationBuilder } from "../src/builders/vartrans/SenseRelationBuilder.js";
import { TranslationBuilder } from "../src/builders/vartrans/TranslationBuilder.js";
import { TranslationSetBuilder } from "../src/builders/vartrans/TranslationSetBuilder.js";
import { LexInfoPoS, LexInfoNumber, LexInfoGender } from "../src/lexinfo/index.js";
import type { URI, LanguageTag } from "../src/types/index.js";

const en = "en" as LanguageTag;
const formId = "urn:uuid:form-1" as URI;
const entryId = "urn:uuid:entry-1" as URI;
const senseId = "urn:uuid:sense-1" as URI;
const lexId = "urn:uuid:lex-1" as URI;
const relId = "urn:uuid:rel-1" as URI;
const trId = "urn:uuid:tr-1" as URI;
const tsId = "urn:uuid:ts-1" as URI;

describe("FormBuilder", () => {
  test("builds a minimal Form", () => {
    const form = new FormBuilder(formId).addWrittenRep("house", en).build();
    expect(form).toEqual({
      "@id": formId,
      "@type": "ontolex:Form",
      "ontolex:writtenRep": [{ "@value": "house", "@language": "en" as LanguageTag }],
    });
  });

  test("setNumber sets lexinfo:number", () => {
    const form = new FormBuilder(formId)
      .addWrittenRep("houses", en)
      .setNumber(LexInfoNumber.plural)
      .build();
    expect(form["lexinfo:number"]).toEqual([LexInfoNumber.plural]);
  });

  test("setGender sets lexinfo:gender", () => {
    const form = new FormBuilder(formId)
      .addWrittenRep("le chat", "fr" as LanguageTag)
      .setGender(LexInfoGender.masculine)
      .build();
    expect(form["lexinfo:gender"]).toEqual([LexInfoGender.masculine]);
  });

  test("idempotency: calling build twice returns equivalent objects", () => {
    const builder = new FormBuilder(formId).addWrittenRep("house", en);
    const a = builder.build();
    const b = builder.build();
    expect(a).toEqual(b);
  });
});

describe("LexicalSenseBuilder", () => {
  test("builds a minimal LexicalSense", () => {
    const sense = new LexicalSenseBuilder(senseId).build();
    expect(sense).toEqual({
      "@id": senseId,
      "@type": "ontolex:LexicalSense",
    });
  });

  test("setReference sets the reference", () => {
    const ref = "https://dbpedia.org/resource/House" as URI;
    const sense = new LexicalSenseBuilder(senseId).setReference(ref).build();
    expect(sense["ontolex:reference"]).toBe(ref);
  });

  test("addDefinition appends to skos:definition", () => {
    const sense = new LexicalSenseBuilder(senseId)
      .addDefinition("A place to live", en)
      .build();
    expect(sense["skos:definition"]).toEqual([
      { "@value": "A place to live", "@language": "en" as LanguageTag },
    ]);
  });

  test("addSenseRelation is idempotent by @id", () => {
    const rel = new SenseRelationBuilder(relId).build();
    const sense = new LexicalSenseBuilder(senseId)
      .addSenseRelation(rel)
      .addSenseRelation(rel)
      .build();
    expect(sense["vartrans:senseRel"]).toHaveLength(1);
  });
});

describe("LexicalEntryBuilder", () => {
  const form = new FormBuilder(formId).addWrittenRep("house", en).build();

  test("builds a minimal LexicalEntry", () => {
    const entry = new LexicalEntryBuilder(entryId, form, en)
      .setCanonicalForm(form)
      .build();
    expect(entry["@id"]).toBe(entryId);
    expect(entry["@type"]).toBe("ontolex:LexicalEntry");
    expect(entry["lime:language"] as string).toBe("en");
    expect(entry["ontolex:canonicalForm"]).toEqual(form);
  });

  test("setPoS sets partOfSpeech", () => {
    const entry = new LexicalEntryBuilder(entryId, form, en)
      .setPoS(LexInfoPoS.noun)
      .build();
    expect(entry["lexinfo:partOfSpeech"]).toEqual([LexInfoPoS.noun]);
  });

  test("addPoS is idempotent", () => {
    const entry = new LexicalEntryBuilder(entryId, form, en)
      .addPoS(LexInfoPoS.noun)
      .addPoS(LexInfoPoS.noun)
      .build();
    expect(entry["lexinfo:partOfSpeech"]).toHaveLength(1);
  });

  test("addOtherForm is idempotent by @id", () => {
    const plural = new FormBuilder("urn:uuid:form-2" as URI)
      .addWrittenRep("houses", en)
      .build();
    const entry = new LexicalEntryBuilder(entryId, form, en)
      .setCanonicalForm(form)
      .addOtherForm(plural)
      .addOtherForm(plural)
      .build();
    expect(entry["ontolex:otherForm"]).toHaveLength(1);
  });
});

describe("LexiconBuilder", () => {
  const form = new FormBuilder(formId).addWrittenRep("house", en).build();
  const entry = new LexicalEntryBuilder(entryId, form, en)
    .setCanonicalForm(form)
    .build();

  test("builds a minimal Lexicon", () => {
    const lex = new LexiconBuilder(lexId, en).build();
    expect(lex["@id"]).toBe(lexId);
    expect(lex["@type"]).toBe("lime:Lexicon");
    expect(lex["lime:language"] as string).toBe("en");
    expect(lex["lime:entry"]).toEqual([]);
  });

  test("addEntry is idempotent by @id", () => {
    const lex = new LexiconBuilder(lexId, en)
      .addEntry(entry)
      .addEntry(entry)
      .build();
    expect(lex["lime:entry"]).toHaveLength(1);
  });

  test("setTitle sets dcterms:title", () => {
    const lex = new LexiconBuilder(lexId, en)
      .setTitle("English Lexicon", en)
      .build();
    expect(lex["dcterms:title"]).toEqual([
      { "@value": "English Lexicon", "@language": "en" as LanguageTag },
    ]);
  });

  test("setMetadata merges arbitrary fields", () => {
    const lex = new LexiconBuilder(lexId, en)
      .setMetadata({ "owl:versionInfo": "1.0.0" })
      .build();
    expect(lex["owl:versionInfo"]).toBe("1.0.0");
  });
});

describe("SenseRelationBuilder", () => {
  test("builds a minimal SenseRelation", () => {
    const rel = new SenseRelationBuilder(relId).build();
    expect(rel).toEqual({
      "@id": relId,
      "@type": "vartrans:SenseRelation",
    });
  });

  test("setSource and setTarget are fluent", () => {
    const src = "urn:uuid:a" as URI;
    const tgt = "urn:uuid:b" as URI;
    const rel = new SenseRelationBuilder(relId)
      .setSource(src)
      .setTarget(tgt)
      .build();
    expect(rel["vartrans:source"]).toBe(src);
    expect(rel["vartrans:target"]).toBe(tgt);
  });
});

describe("TranslationBuilder", () => {
  test("builds a minimal Translation", () => {
    const tr = new TranslationBuilder(trId).build();
    expect(tr).toEqual({
      "@id": trId,
      "@type": "vartrans:Translation",
    });
  });
});

describe("TranslationSetBuilder", () => {
  test("builds a minimal TranslationSet with empty trans array", () => {
    const ts = new TranslationSetBuilder(tsId).build();
    expect(ts["@id"]).toBe(tsId);
    expect(ts["@type"]).toBe("vartrans:TranslationSet");
    expect(ts["vartrans:trans"]).toEqual([]);
  });

  test("addTranslation is idempotent by @id", () => {
    const tr = new TranslationBuilder(trId).build();
    const ts = new TranslationSetBuilder(tsId)
      .addTranslation(tr)
      .addTranslation(tr)
      .build();
    expect(ts["vartrans:trans"]).toHaveLength(1);
  });
});
