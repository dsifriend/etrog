import { describe, expect, test } from "bun:test";
import { ComponentBuilder } from "../src/builders/ComponentBuilder.js";
import { ConceptSetBuilder } from "../src/builders/ConceptSetBuilder.js";
import { ConceptualizationSetBuilder } from "../src/builders/ConceptualizationSetBuilder.js";
import { FormBuilder } from "../src/builders/FormBuilder.js";
import { LexicalConceptBuilder } from "../src/builders/LexicalConceptBuilder.js";
import { LexicalEntryBuilder } from "../src/builders/LexicalEntryBuilder.js";
import { LexicalizationSetBuilder } from "../src/builders/LexicalizationSetBuilder.js";
import { LexicalLinksetBuilder } from "../src/builders/LexicalLinksetBuilder.js";
import { LexicalSenseBuilder } from "../src/builders/LexicalSenseBuilder.js";
import { LexiconBuilder } from "../src/builders/LexiconBuilder.js";
import { EntryBuilder } from "../src/builders/lexicog/EntryBuilder.js";
import { FormRestrictionBuilder } from "../src/builders/lexicog/FormRestrictionBuilder.js";
import { LexicographicComponentBuilder } from "../src/builders/lexicog/LexicographicComponentBuilder.js";
import { LexicographicResourceBuilder } from "../src/builders/lexicog/LexicographicResourceBuilder.js";
import { UsageExampleBuilder } from "../src/builders/lexicog/UsageExampleBuilder.js";
import { OntoMapBuilder } from "../src/builders/synsem/OntoMapBuilder.js";
import { SyntacticArgumentBuilder } from "../src/builders/synsem/SyntacticArgumentBuilder.js";
import { SyntacticFrameBuilder } from "../src/builders/synsem/SyntacticFrameBuilder.js";
import { ConceptualRelationBuilder } from "../src/builders/vartrans/ConceptualRelationBuilder.js";
import { LexicalRelationBuilder } from "../src/builders/vartrans/LexicalRelationBuilder.js";
import { SenseRelationBuilder } from "../src/builders/vartrans/SenseRelationBuilder.js";
import { TerminologicalRelationBuilder } from "../src/builders/vartrans/TerminologicalRelationBuilder.js";
import { TranslationBuilder } from "../src/builders/vartrans/TranslationBuilder.js";
import { TranslationSetBuilder } from "../src/builders/vartrans/TranslationSetBuilder.js";
import {
	LexInfoGender,
	LexInfoNumber,
	LexInfoPoS,
	LexInfoRegister,
} from "../src/lexinfo/index.js";
import type { LanguageTag, URI } from "../src/types/index.js";

const en = "en" as LanguageTag;
const formId = "urn:uuid:form-1" as URI;
const entryId = "urn:uuid:entry-1" as URI;
const senseId = "urn:uuid:sense-1" as URI;
const conceptId = "urn:uuid:concept-1" as URI;
const conceptSetId = "urn:uuid:concept-set-1" as URI;
const usageId = "urn:uuid:usage-1" as URI;
const lexId = "urn:uuid:lex-1" as URI;
const relId = "urn:uuid:rel-1" as URI;
const trId = "urn:uuid:tr-1" as URI;
const tsId = "urn:uuid:ts-1" as URI;
const lexSetId = "urn:uuid:lexset-1" as URI;
const linkSetId = "urn:uuid:linkset-1" as URI;
const conSetId = "urn:uuid:conceptualization-set-1" as URI;
const partitionId = "urn:uuid:partition-1" as URI;
const componentId = "urn:uuid:component-1" as URI;
const lexRelId = "urn:uuid:lexrel-1" as URI;
const termRelId = "urn:uuid:termrel-1" as URI;
const conceptRelId = "urn:uuid:conceptrel-1" as URI;
const argId = "urn:uuid:arg-1" as URI;
const frameId = "urn:uuid:frame-1" as URI;
const mapId = "urn:uuid:map-1" as URI;
const exampleId = "urn:uuid:example-1" as URI;
const restrictionId = "urn:uuid:restriction-1" as URI;
const lexEntryId = "urn:uuid:lexentry-1" as URI;
const lexCompId = "urn:uuid:lexcomp-1" as URI;
const lexResId = "urn:uuid:lexres-1" as URI;

describe("FormBuilder", () => {
	test("builds a minimal Form", () => {
		const form = new FormBuilder(formId).addWrittenRep("house", en).build();
		expect(form).toEqual({
			"@id": formId,
			"@type": "ontolex:Form",
			"ontolex:writtenRep": [
				{ "@value": "house", "@language": "en" as LanguageTag },
			],
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

	test("addRepresentation appends ontolex:representation", () => {
		const form = new FormBuilder(formId)
			.addWrittenRep("house", en)
			.addRepresentation("⠓⠕⠥⠎⠑", en)
			.build();
		expect(form["ontolex:representation"]).toEqual([
			{ "@value": "⠓⠕⠥⠎⠑", "@language": "en" as LanguageTag },
		]);
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

	test("addUsageValue appends ontolex:usage", () => {
		const sense = new LexicalSenseBuilder(senseId)
			.addUsageValue(usageId, "archaic", en)
			.build();
		expect(sense["ontolex:usage"]).toEqual([
			{
				"@id": usageId,
				"@type": "ontolex:Usage",
				"rdf:value": [
					{ "@value": "archaic", "@language": "en" as LanguageTag },
				],
			},
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

	test("addRegister is idempotent", () => {
		const sense = new LexicalSenseBuilder(senseId)
			.addRegister(LexInfoRegister.vulgarRegister)
			.addRegister(LexInfoRegister.vulgarRegister)
			.build();
		expect(sense["lexinfo:register"]).toEqual([LexInfoRegister.vulgarRegister]);
	});

	test("addRelates is idempotent", () => {
		const target = "urn:uuid:sense-b" as URI;
		const sense = new LexicalSenseBuilder(senseId)
			.addRelates(target)
			.addRelates(target)
			.build();
		expect(sense["vartrans:relates"]).toEqual([target]);
	});

	test("addTranslatableAs is idempotent", () => {
		const target = "urn:uuid:sense-maison" as URI;
		const sense = new LexicalSenseBuilder(senseId)
			.addTranslatableAs(target)
			.addTranslatableAs(target)
			.build();
		expect(sense["vartrans:translatableAs"]).toEqual([target]);
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

	test("addDenotes is idempotent", () => {
		const denotes = "https://dbpedia.org/resource/House" as URI;
		const entry = new LexicalEntryBuilder(entryId, form, en)
			.addDenotes(denotes)
			.addDenotes(denotes)
			.build();
		expect(entry["ontolex:denotes"]).toEqual([denotes]);
	});

	test("addMorphologicalPattern is idempotent", () => {
		const pattern = "https://example.org/morphology/declension" as URI;
		const entry = new LexicalEntryBuilder(entryId, form, en)
			.addMorphologicalPattern(pattern)
			.addMorphologicalPattern(pattern)
			.build();
		expect(entry["ontolex:morphologicalPattern"]).toEqual([pattern]);
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

	test("addSubterm is idempotent", () => {
		const subterm = "urn:uuid:entry-fever" as URI;
		const entry = new LexicalEntryBuilder(entryId, form, en)
			.addSubterm(subterm)
			.addSubterm(subterm)
			.build();
		expect(entry["decomp:subterm"]).toEqual([subterm]);
	});

	test("addConstituent is idempotent by @id", () => {
		const component = new ComponentBuilder(componentId).build();
		const entry = new LexicalEntryBuilder(entryId, form, en)
			.addConstituent(component)
			.addConstituent(component)
			.build();
		expect(entry["decomp:constituent"]).toHaveLength(1);
	});

	test("addLexicalRel is idempotent", () => {
		const target = "urn:uuid:entry-b" as URI;
		const entry = new LexicalEntryBuilder(entryId, form, en)
			.addLexicalRel(target)
			.addLexicalRel(target)
			.build();
		expect(entry["vartrans:lexicalRel"]).toEqual([target]);
	});

	test("addTranslation is idempotent", () => {
		const translation = "urn:uuid:entry-maison" as URI;
		const entry = new LexicalEntryBuilder(entryId, form, en)
			.addTranslation(translation)
			.addTranslation(translation)
			.build();
		expect(entry["vartrans:translation"]).toEqual([translation]);
	});
});

describe("LexicalConceptBuilder", () => {
	test("builds a minimal LexicalConcept", () => {
		const concept = new LexicalConceptBuilder(conceptId).build();
		expect(concept["@id"]).toBe(conceptId);
		expect(concept["@type"]).toBe("ontolex:LexicalConcept");
	});

	test("addIsConceptOf is idempotent", () => {
		const target = "https://dbpedia.org/resource/House" as URI;
		const concept = new LexicalConceptBuilder(conceptId)
			.addIsConceptOf(target)
			.addIsConceptOf(target)
			.build();
		expect(concept["ontolex:isConceptOf"]).toEqual([target]);
	});
});

describe("ConceptSetBuilder", () => {
	test("builds a minimal ConceptSet", () => {
		const set = new ConceptSetBuilder(conceptSetId).build();
		expect(set["@id"]).toBe(conceptSetId);
		expect(set["@type"]).toBe("ontolex:ConceptSet");
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

	test("addRelates appends to vartrans:relates", () => {
		const resource = "urn:uuid:res-1" as URI;
		const rel = new SenseRelationBuilder(relId).addRelates(resource).build();
		expect(rel["vartrans:relates"]).toEqual([resource]);
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

describe("LexicalizationSetBuilder", () => {
	test("builds a minimal LexicalizationSet", () => {
		const set = new LexicalizationSetBuilder(lexSetId, en).build();
		expect(set["@id"]).toBe(lexSetId);
		expect(set["@type"]).toBe("lime:LexicalizationSet");
		expect(set["lime:language"] as string).toBe("en");
	});

	test("sets LIME lexicalization metadata fields", () => {
		const set = new LexicalizationSetBuilder(lexSetId, en)
			.setLexiconDataset("urn:uuid:lexicon-ds" as URI)
			.setReferenceDataset("urn:uuid:ref-ds" as URI)
			.setLexicalizationModel("http://www.w3.org/ns/lemon/ontolex#" as URI)
			.setReferences(20)
			.setLexicalizations(50)
			.setAvgNumOfLexicalizations(0.66)
			.setLexicalEntries(15)
			.setPercentage(0.4)
			.setResourceType("http://www.w3.org/2002/07/owl#Class" as URI)
			.build();
		expect(set["lime:lexiconDataset"]).toBe("urn:uuid:lexicon-ds" as URI);
		expect(set["lime:referenceDataset"]).toBe("urn:uuid:ref-ds" as URI);
		expect(set["lime:lexicalizationModel"]).toBe(
			"http://www.w3.org/ns/lemon/ontolex#" as URI,
		);
		expect(set["lime:references"]).toBe(20);
		expect(set["lime:lexicalizations"]).toBe(50);
		expect(set["lime:avgNumOfLexicalizations"]).toBe(0.66);
		expect(set["lime:lexicalEntries"]).toBe(15);
		expect(set["lime:percentage"]).toBe(0.4);
		expect(set["lime:resourceType"]).toBe(
			"http://www.w3.org/2002/07/owl#Class" as URI,
		);
	});

	test("addPartition is idempotent by @id for URI and object partitions", () => {
		const partitionObj = new LexicalizationSetBuilder(partitionId, en).build();
		const set = new LexicalizationSetBuilder(lexSetId, en)
			.addPartition(partitionId)
			.addPartition(partitionObj)
			.build();
		expect(set["lime:partition"]).toHaveLength(1);
	});

	test("build returns a defensive copy for lime:partition", () => {
		const builder = new LexicalizationSetBuilder(lexSetId, en).addPartition(
			partitionId,
		);
		const a = builder.build();
		const b = builder.build();
		(a["lime:partition"] as unknown[]).push("urn:uuid:partition-2" as URI);
		expect((b["lime:partition"] as unknown[]).length).toBe(1);
	});
});

describe("LexicalLinksetBuilder", () => {
	test("builds a minimal LexicalLinkset", () => {
		const set = new LexicalLinksetBuilder(linkSetId).build();
		expect(set["@id"]).toBe(linkSetId);
		expect(set["@type"]).toBe("lime:LexicalLinkset");
	});

	test("sets LIME lexical linkset metadata fields", () => {
		const conceptSet = new ConceptSetBuilder(conceptSetId).build();
		const set = new LexicalLinksetBuilder(linkSetId)
			.setLexiconDataset("urn:uuid:lexicon-ds" as URI)
			.setTargetDataset("urn:uuid:target-ds" as URI)
			.setReferenceDataset("urn:uuid:ref-ds" as URI)
			.setConceptualDataset(conceptSet)
			.setConcepts(117659)
			.setLinks(206941)
			.setAvgNumOfLinks(1.76)
			.setResourceType("http://www.w3.org/2002/07/owl#Class" as URI)
			.build();
		expect(set["lime:lexiconDataset"]).toBe("urn:uuid:lexicon-ds" as URI);
		expect(set["lime:targetDataset"]).toBe("urn:uuid:target-ds" as URI);
		expect(set["lime:referenceDataset"]).toBe("urn:uuid:ref-ds" as URI);
		expect(set["lime:conceptualDataset"]).toEqual(conceptSet);
		expect(set["lime:concepts"]).toBe(117659);
		expect(set["lime:links"]).toBe(206941);
		expect(set["lime:avgNumOfLinks"]).toBe(1.76);
		expect(set["lime:resourceType"]).toBe(
			"http://www.w3.org/2002/07/owl#Class" as URI,
		);
	});

	test("addPartition is idempotent by @id for URI and object partitions", () => {
		const partitionObj = new LexicalLinksetBuilder(partitionId).build();
		const set = new LexicalLinksetBuilder(linkSetId)
			.addPartition(partitionId)
			.addPartition(partitionObj)
			.build();
		expect(set["lime:partition"]).toHaveLength(1);
	});

	test("build returns a defensive copy for lime:partition", () => {
		const builder = new LexicalLinksetBuilder(linkSetId).addPartition(
			partitionId,
		);
		const a = builder.build();
		const b = builder.build();
		(a["lime:partition"] as unknown[]).push("urn:uuid:partition-2" as URI);
		expect((b["lime:partition"] as unknown[]).length).toBe(1);
	});
});

describe("ConceptualizationSetBuilder", () => {
	test("builds a minimal ConceptualizationSet", () => {
		const set = new ConceptualizationSetBuilder(conSetId).build();
		expect(set["@id"]).toBe(conSetId);
		expect(set["@type"]).toBe("lime:ConceptualizationSet");
	});

	test("sets conceptualization statistics unique to LIME", () => {
		const conceptSet = new ConceptSetBuilder(conceptSetId).build();
		const set = new ConceptualizationSetBuilder(conSetId)
			.setLexiconDataset("urn:uuid:lexicon-ds" as URI)
			.setConceptualDataset(conceptSet)
			.setLexicalEntries(155287)
			.setConcepts(117659)
			.setConceptualizations(206941)
			.setAvgAmbiguity(1.33)
			.setAvgSynonymy(1.76)
			.build();
		expect(set["lime:lexiconDataset"]).toBe("urn:uuid:lexicon-ds" as URI);
		expect(set["lime:conceptualDataset"]).toEqual(conceptSet);
		expect(set["lime:lexicalEntries"]).toBe(155287);
		expect(set["lime:concepts"]).toBe(117659);
		expect(set["lime:conceptualizations"]).toBe(206941);
		expect(set["lime:avgAmbiguity"]).toBe(1.33);
		expect(set["lime:avgSynonymy"]).toBe(1.76);
	});

	test("accepts conceptual dataset as URI", () => {
		const set = new ConceptualizationSetBuilder(conSetId)
			.setConceptualDataset("urn:uuid:concept-set" as URI)
			.build();
		expect(set["lime:conceptualDataset"]).toBe("urn:uuid:concept-set" as URI);
	});
});

describe("ComponentBuilder", () => {
	test("builds a minimal Component", () => {
		const component = new ComponentBuilder(componentId).build();
		expect(component).toEqual({
			"@id": componentId,
			"@type": "decomp:Component",
		});
	});

	test("setCorrespondsTo sets correspondsTo property", () => {
		const correspondsTo = "urn:uuid:entry-lunge" as URI;
		const component = new ComponentBuilder(componentId)
			.setCorrespondsTo(correspondsTo)
			.build();
		expect(component["decomp:correspondsTo"]).toBe(correspondsTo);
	});
});

describe("LexicalRelationBuilder", () => {
	test("builds a minimal LexicalRelation", () => {
		const rel = new LexicalRelationBuilder(lexRelId).build();
		expect(rel).toEqual({
			"@id": lexRelId,
			"@type": "vartrans:LexicalRelation",
		});
	});

	test("setSource and setTarget are fluent", () => {
		const src = "urn:uuid:entry-a" as URI;
		const tgt = "urn:uuid:entry-b" as URI;
		const rel = new LexicalRelationBuilder(lexRelId)
			.setSource(src)
			.setTarget(tgt)
			.build();
		expect(rel["vartrans:source"]).toBe(src);
		expect(rel["vartrans:target"]).toBe(tgt);
	});

	test("setCategory sets relation category", () => {
		const category =
			"http://www.lexinfo.net/ontology/3.0/lexinfo#derivation" as URI;
		const rel = new LexicalRelationBuilder(lexRelId)
			.setCategory(category)
			.build();
		expect(rel["vartrans:category"]).toBe(category);
	});

	test("addRelates appends to vartrans:relates", () => {
		const resource1 = "urn:uuid:res-1" as URI;
		const resource2 = "urn:uuid:res-2" as URI;
		const rel = new LexicalRelationBuilder(lexRelId)
			.addRelates(resource1)
			.addRelates(resource2)
			.build();
		expect(rel["vartrans:relates"]).toEqual([resource1, resource2]);
	});
});

describe("TerminologicalRelationBuilder", () => {
	test("builds a minimal TerminologicalRelation", () => {
		const rel = new TerminologicalRelationBuilder(termRelId).build();
		expect(rel).toEqual({
			"@id": termRelId,
			"@type": "vartrans:TerminologicalRelation",
		});
	});

	test("setSource and setTarget are fluent", () => {
		const src = "urn:uuid:term-a" as URI;
		const tgt = "urn:uuid:term-b" as URI;
		const rel = new TerminologicalRelationBuilder(termRelId)
			.setSource(src)
			.setTarget(tgt)
			.build();
		expect(rel["vartrans:source"]).toBe(src);
		expect(rel["vartrans:target"]).toBe(tgt);
	});

	test("addRelates appends to vartrans:relates", () => {
		const resource = "urn:uuid:res-1" as URI;
		const rel = new TerminologicalRelationBuilder(termRelId)
			.addRelates(resource)
			.build();
		expect(rel["vartrans:relates"]).toEqual([resource]);
	});
});

describe("ConceptualRelationBuilder", () => {
	test("builds a minimal ConceptualRelation", () => {
		const rel = new ConceptualRelationBuilder(conceptRelId).build();
		expect(rel).toEqual({
			"@id": conceptRelId,
			"@type": "vartrans:ConceptualRelation",
		});
	});

	test("setSource and setTarget are fluent", () => {
		const src = "urn:uuid:concept-a" as URI;
		const tgt = "urn:uuid:concept-b" as URI;
		const rel = new ConceptualRelationBuilder(conceptRelId)
			.setSource(src)
			.setTarget(tgt)
			.build();
		expect(rel["vartrans:source"]).toBe(src);
		expect(rel["vartrans:target"]).toBe(tgt);
	});

	test("setCategory sets relation category", () => {
		const category = "http://www.w3.org/2004/02/skos/core#broader" as URI;
		const rel = new ConceptualRelationBuilder(conceptRelId)
			.setCategory(category)
			.build();
		expect(rel["vartrans:category"]).toBe(category);
	});

	test("addRelates appends to vartrans:relates", () => {
		const resource = "urn:uuid:res-1" as URI;
		const rel = new ConceptualRelationBuilder(conceptRelId)
			.addRelates(resource)
			.build();
		expect(rel["vartrans:relates"]).toEqual([resource]);
	});
});

describe("SyntacticArgumentBuilder", () => {
	test("builds a minimal SyntacticArgument", () => {
		const arg = new SyntacticArgumentBuilder(argId).build();
		expect(arg).toEqual({
			"@id": argId,
			"@type": "synsem:SyntacticArgument",
		});
	});

	test("setIsA sets the class or property", () => {
		const isA = "http://example.org/ontology#Agent" as URI;
		const arg = new SyntacticArgumentBuilder(argId).setIsA(isA).build();
		expect(arg["synsem:isA"]).toBe(isA);
	});

	test("addMarker appends to synsem:marker", () => {
		const arg = new SyntacticArgumentBuilder(argId)
			.addMarker("by", en)
			.addMarker("avec", "fr" as LanguageTag)
			.build();
		expect(arg["synsem:marker"]).toEqual([
			{ "@value": "by", "@language": "en" as LanguageTag },
			{ "@value": "avec", "@language": "fr" as LanguageTag },
		]);
	});

	test("setOptional sets the optional flag", () => {
		const arg = new SyntacticArgumentBuilder(argId).setOptional(true).build();
		expect(arg["synsem:optional"]).toBe(true);
	});
});

describe("OntoMapBuilder", () => {
	test("builds a minimal OntoMap", () => {
		const map = new OntoMapBuilder(mapId).build();
		expect(map).toEqual({
			"@id": mapId,
			"@type": "synsem:OntoMap",
		});
	});

	test("setSubjOfProp and setObjOfProp are fluent", () => {
		const subj = "http://example.org/ontology#hasOwner" as URI;
		const obj = "http://example.org/ontology#Owner" as URI;
		const map = new OntoMapBuilder(mapId)
			.setSubjOfProp(subj)
			.setObjOfProp(obj)
			.build();
		expect(map["synsem:subjOfProp"]).toBe(subj);
		expect(map["synsem:objOfProp"]).toBe(obj);
	});

	test("setOntoMapping sets the ontoMapping link", () => {
		const sense = "urn:uuid:sense-a" as URI;
		const map = new OntoMapBuilder(mapId).setOntoMapping(sense).build();
		expect(map["synsem:ontoMapping"]).toBe(sense);
	});

	test("addSubmap is idempotent by @id", () => {
		const submap = new OntoMapBuilder("urn:uuid:submap-1" as URI).build();
		const map = new OntoMapBuilder(mapId)
			.addSubmap(submap)
			.addSubmap(submap)
			.build();
		expect(map["synsem:submap"]).toHaveLength(1);
	});
});

describe("SyntacticFrameBuilder", () => {
	test("builds a minimal SyntacticFrame", () => {
		const frame = new SyntacticFrameBuilder(frameId).build();
		expect(frame).toEqual({
			"@id": frameId,
			"@type": "synsem:SyntacticFrame",
		});
	});

	test("addSynArg is idempotent by @id", () => {
		const arg = new SyntacticArgumentBuilder(argId).build();
		const frame = new SyntacticFrameBuilder(frameId)
			.addSynArg(arg)
			.addSynArg(arg)
			.build();
		expect(frame["synsem:synArg"]).toHaveLength(1);
	});

	test("addOntoCorrespondence is idempotent by @id", () => {
		const map = new OntoMapBuilder(mapId).build();
		const frame = new SyntacticFrameBuilder(frameId)
			.addOntoCorrespondence(map)
			.addOntoCorrespondence(map)
			.build();
		expect(frame["synsem:ontoCorrespondence"]).toHaveLength(1);
	});
});

describe("FormRestrictionBuilder", () => {
	test("builds a minimal FormRestriction", () => {
		const restriction = new FormRestrictionBuilder(restrictionId).build();
		expect(restriction).toEqual({
			"@id": restrictionId,
			"@type": "lexicog:FormRestriction",
		});
	});

	test("addWrittenRep appends to ontolex:writtenRep", () => {
		const restriction = new FormRestrictionBuilder(restrictionId)
			.addWrittenRep("houses", en)
			.build();
		expect(restriction["ontolex:writtenRep"]).toEqual([
			{ "@value": "houses", "@language": "en" as LanguageTag },
		]);
	});
});

describe("UsageExampleBuilder", () => {
	test("builds a minimal UsageExample with value", () => {
		const example = new UsageExampleBuilder(exampleId)
			.addValue("The house is on fire.", en)
			.build();
		expect(example).toEqual({
			"@id": exampleId,
			"@type": "lexicog:UsageExample",
			"rdf:value": [{ "@value": "The house is on fire.", "@language": en }],
		});
	});

	test("setSource sets dcterms:source", () => {
		const source = "https://example.org/corpus/1" as URI;
		const example = new UsageExampleBuilder(exampleId)
			.addValue("Example text", en)
			.setSource(source)
			.build();
		expect(example["dcterms:source"]).toBe(source);
	});

	test("addRestriction is idempotent by @id", () => {
		const restriction = new FormRestrictionBuilder(restrictionId).build();
		const example = new UsageExampleBuilder(exampleId)
			.addValue("Example", en)
			.addRestriction(restriction)
			.addRestriction(restriction)
			.build();
		expect(example["lexicog:restrictedTo"]).toHaveLength(1);
	});
});

describe("LexicographicComponentBuilder", () => {
	test("builds a minimal LexicographicComponent", () => {
		const component = new LexicographicComponentBuilder(lexCompId).build();
		expect(component).toEqual({
			"@id": lexCompId,
			"@type": "lexicog:LexicographicComponent",
		});
	});

	test("addSubComponent is idempotent by @id", () => {
		const subcomp = new LexicographicComponentBuilder(
			"urn:uuid:subcomp-1" as URI,
		).build();
		const component = new LexicographicComponentBuilder(lexCompId)
			.addSubComponent(subcomp)
			.addSubComponent(subcomp)
			.build();
		expect(component["lexicog:subComponent"]).toHaveLength(1);
	});
});

describe("EntryBuilder", () => {
	test("builds a minimal Entry", () => {
		const entry = new EntryBuilder(lexEntryId).build();
		expect(entry).toEqual({
			"@id": lexEntryId,
			"@type": "lexicog:Entry",
		});
	});

	test("setDescribes sets the lexicog:describes link", () => {
		const describes = "urn:uuid:lexical-entry-a" as URI;
		const entry = new EntryBuilder(lexEntryId).setDescribes(describes).build();
		expect(entry["lexicog:describes"]).toBe(describes);
	});

	test("addSubComponent is idempotent by @id", () => {
		const component = new LexicographicComponentBuilder(lexCompId).build();
		const entry = new EntryBuilder(lexEntryId)
			.addSubComponent(component)
			.addSubComponent(component)
			.build();
		expect(entry["lexicog:subComponent"]).toHaveLength(1);
	});
});

describe("LexicographicResourceBuilder", () => {
	test("builds a minimal LexicographicResource", () => {
		const resource = new LexicographicResourceBuilder(lexResId).build();
		expect(resource).toEqual({
			"@id": lexResId,
			"@type": "lexicog:LexicographicResource",
		});
	});

	test("addTitle appends to dcterms:title", () => {
		const resource = new LexicographicResourceBuilder(lexResId)
			.addTitle("Oxford English Dictionary", en)
			.build();
		expect(resource["dcterms:title"]).toEqual([
			{ "@value": "Oxford English Dictionary", "@language": en },
		]);
	});

	test("setLanguage sets dcterms:language", () => {
		const resource = new LexicographicResourceBuilder(lexResId)
			.setLanguage(en)
			.build();
		expect(resource["dcterms:language"]).toBe(en);
	});

	test("addEntry is idempotent by @id", () => {
		const entry = new EntryBuilder(lexEntryId).build();
		const resource = new LexicographicResourceBuilder(lexResId)
			.addEntry(entry)
			.addEntry(entry)
			.build();
		expect(resource["lexicog:entry"]).toHaveLength(1);
	});
});
