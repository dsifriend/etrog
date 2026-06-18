# Etrog

> **Etrog** is a public TypeScript library (built with Bun) for working with
> Linguistic Linked Open Data. It provides first-class JSON-LD support for all
> published OntoLex-Lemon modules, round-trips to RDF/XML and Turtle, and
> targeted export to DICT and Apple Dictionary XML formats.
>
> The name is a nod to the Yiddict.app project that inspired it, while keeping
> with the citrus theme of the OntoLex-Lemon family of standards.

## Table of Contents

1. [Project Philosophy](#1-project-philosophy)
2. [Standards Coverage](#2-standards-coverage)
3. [Repository Layout](#3-repository-layout)
4. [Architecture Overview](#4-architecture-overview)
5. [Module Specifications](#5-module-specifications)
6. [JSON-LD Strategy](#6-json-ld-strategy)
7. [RDF Round-Trip Strategy](#7-rdf-round-trip-strategy)
8. [Export Targets](#8-export-targets)
9. [Glossary](#9-glossary)

For developer-facing tooling, build, testing, API design, and publishing
conventions, see [`AGENTS.md`](./AGENTS.md).

---

## 1. Project Philosophy

Etrog is designed for **web developers** who need to produce, consume, or extend
Linguistic Linked Open Data (LLOD) without being experts in Semantic Web
tooling. The guiding principles are:

- **Standards-first, not standards-only.** Every type, property, and relation in
  the public API maps directly to a named class or property in an official
  standard. Developer ergonomics are layered *on top of* — never *instead of* —
  the standard model.

  - **Standards coverage:** This library aims for full coverage of its standards,
    however, priority was given those parts for which the library authors had
    immediate need. If the standards have drifted or you identify a need for a
    some unsupported feature, please open an issue or submit a pull request.

- **JSON-LD is the native representation.** RDF triples are a first-class citizen
  internally, but the primary serialization surface is JSON-LD. Every object the
  library produces is valid JSON-LD and can be consumed by any JSON-LD 1.1
  processor without any Etrog dependency.

- **Interoperability over convenience.** Where a convenient shortcut would
  produce output that cannot round-trip cleanly to standard RDF, the shortcut is
  not offered. Builder helpers are syntactic sugar that compile to the canonical
  model, not divergent representations.

- **No database coupling.** Etrog has no opinion about persistence. It is a
  data-modeling and serialization library. Database adapters (Supabase, Postgres,
  triple stores) belong in separate packages built on top of Etrog.

- **Bun-native, Node.js-compatible.** The library is developed with Bun and uses
  Bun's test runner, bundler, and workspace tooling. All published packages must
  also work on current Node.js via standard ESM interop. Bun-specific APIs (e.g.
  `Bun.file`) must not appear in any code path reachable by consumers; they are
  permitted only in internal dev tooling and scripts.

---

## 2. Standards Coverage

### 2.1 OntoLex-Lemon Modules

All six published modules of the OntoLex-Lemon vocabulary family must be
covered. Each maps to a dedicated sub-module in the library (see §3).

| Status | Module | Prefix | Namespace |
|--------|--------|--------|-----------|
| ✅ Required | **ontolex** (Core) | `ontolex:` | `http://www.w3.org/ns/lemon/ontolex#` |
| ✅ Required | **lime** (Linguistic Metadata) | `lime:` | `http://www.w3.org/ns/lemon/lime#` |
| ✅ Required | **vartrans** (Variation & Translation) | `vartrans:` | `http://www.w3.org/ns/lemon/vartrans#` |
| ✅ Required | **decomp** (Decomposition) | `decomp:` | `http://www.w3.org/ns/lemon/decomp#` |
| ✅ Required | **synsem** (Syntax & Semantics) | `synsem:` | `http://www.w3.org/ns/lemon/synsem#` |
| ✅ Required | **lexicog** (Lexicography) | `lexicog:` | `http://www.w3.org/ns/lemon/lexicog#` |
| 🔜 Planned | **morph** (Morphology — CG Draft) | `morph:` | `http://www.w3.org/ns/lemon/morph` |
| 🔜 Planned | **frac** (Frequency & Attestation — CG Draft) | `frac:` | *(TBD per spec)* |

Reference spec: https://www.w3.org/2016/05/ontolex/ (core + vartrans + decomp +
synsem + lime); https://www.w3.org/2019/09/lexicog/ (lexicog).

### 2.2 Companion Ontologies

| Standard | Prefix | Namespace | Role |
|----------|--------|-----------|------|
| **LexInfo 3.0** | `lexinfo:` | `http://www.lexinfo.net/ontology/3.0/lexinfo#` | Morphosyntactic feature values (PoS, case, tense, gender, …) |
| **SKOS** | `skos:` | `http://www.w3.org/2004/02/skos/core#` | Concept schemes; `LexicalConcept` is a subclass of `skos:Concept` |
| **Dublin Core Terms** | `dcterms:` | `http://purl.org/dc/terms/` | Lexicon metadata (creator, license, date, …) |
| **OWL** | `owl:` | `http://www.w3.org/2002/07/owl#` | Ontology linking (`owl:sameAs`, `owl:equivalentClass`) |
| **RDF / RDFS** | `rdf:`, `rdfs:` | standard W3C URIs | Foundational RDF primitives |
| **Global WordNet schema** | `wn:` | `https://globalwordnet.github.io/schemas/wn#` | Interop layer for Open English WordNet / GWA resources |
| **DBnary extension** | `dbnary:` | `http://kaiko.getalp.org/dbnary#` | Interop layer for DBnary / Wiktionary-based resources |

**DBnary URI convention note**

DBnary uses two related but distinct URI spaces:

- **Vocabulary terms** use the hash namespace, e.g.
  `http://kaiko.getalp.org/dbnary#isTranslationOf`
- **Extracted resources** use a path-based IRI with a language/graph segment,
  e.g. `http://kaiko.getalp.org/dbnary/eng/cat__Noun__1` or
  `http://kaiko.getalp.org/dbnary/fra/chat`

In Etrog, `@etrog/dbnary` mirrors this split:
`isDbnaryUri` is for the `dbnary#` vocabulary namespace, while
`isDbnaryResourceIri` validates path-based DBnary resource IRIs.

Reference: DBnary online access examples and documentation:
https://kaiko.getalp.org/about-dbnary/online-access/

### 2.3 Export Targets

| Target | Format | Audience |
|--------|--------|----------|
| **JSON-LD** | `.jsonld` | Primary; all LLOD consumers |
| **Turtle** | `.ttl` | SPARQL, Linked Data publishing |
| **RDF/XML** | `.rdf` | Legacy triple stores; official ontology publishing format |
| **DICT** | `.dict` + `.index` (dictzip-compatible) | Public DICT servers, `dict.org` |
| **Apple Dictionary XML** | `.xml` (Apple DDS schema) | macOS/iOS Dictionary Services |

---

## 3. Repository Layout

```/dev/null/layout.txt#L1-55
etrog/
├── AGENTS.md
├── README.md
├── LICENSE                        # MIT
├── package.json                   # Bun workspace root
├── bunfig.toml
├── tsconfig.json                  # base tsconfig (strict, ESM)
│
├── packages/
│   │
│   ├── core/                      # @etrog/core
│   │   ├── src/
│   │   │   ├── namespaces.ts      # All standard namespace URIs + DEFAULT_CONTEXT
│   │   │   ├── types/             # Foundational TS types (URI, LangString, …)
│   │   │   ├── ontolex/           # ontolex: module types & helpers
│   │   │   ├── lime/              # lime: module types & helpers
│   │   │   ├── vartrans/          # vartrans: module types & helpers
│   │   │   ├── decomp/            # decomp: module types & helpers
│   │   │   ├── synsem/            # synsem: module types & helpers
│   │   │   ├── lexicog/           # lexicog: module types & helpers
│   │   │   ├── lexinfo/           # LexInfo 3.0 enumerations & property maps
│   │   │   ├── skos/              # SKOS concept/scheme helpers
│   │   │   ├── context/           # JSON-LD @context construction & compaction
│   │   │   ├── builders/          # Fluent builder API
│   │   │   └── index.ts
│   │   ├── test/
│   │   └── package.json
│   │
│   ├── rdf/                       # @etrog/rdf
│   │   ├── src/
│   │   │   ├── turtle/            # Turtle parser & serializer
│   │   │   ├── rdfxml/            # RDF/XML parser & serializer
│   │   │   ├── jsonld/            # JSON-LD expand / compact / frame
│   │   │   └── index.ts
│   │   ├── test/
│   │   └── package.json
│   │
│   ├── wordnet/                   # @etrog/wordnet  (GWA / OEWN interop)
│   │   ├── src/
│   │   │   ├── schema.ts          # wn: namespace types
│   │   │   ├── reader.ts          # Load OEWN Turtle dumps
│   │   │   └── index.ts
│   │   ├── test/
│   │   └── package.json
│   │
│   ├── dbnary/                    # @etrog/dbnary  (DBnary interop)
│   │   ├── src/
│   │   │   ├── schema.ts          # dbnary: namespace types
│   │   │   ├── reader.ts          # Load DBnary Turtle dumps
│   │   │   └── index.ts
│   │   ├── test/
│   │   └── package.json
│   │
│   ├── export-dict/               # @etrog/export-dict
│   │   ├── src/
│   │   │   ├── serializer.ts      # Lexicon → .dict + .index
│   │   │   └── index.ts
│   │   ├── test/
│   │   └── package.json
│   │
│   └── export-apple/              # @etrog/export-apple
│       ├── src/
│       │   ├── serializer.ts      # Lexicon → Apple DDS XML
│       │   └── index.ts
│       ├── test/
│       └── package.json
│
└── docs/                          # API docs (auto-generated via typedoc)
```

---

## 4. Architecture Overview

### 4.1 Data Model

The canonical in-memory representation is a **plain TypeScript object graph**
that mirrors the RDF model one-to-one. Every interface bears a mandatory `@type`
field containing the full expanded URI of the RDF class (e.g.,
`"http://www.w3.org/ns/lemon/ontolex#LexicalEntry"`), and every resource bears
a mandatory `@id` field containing its URI or a blank-node identifier (e.g.,
`"_:b0"`).

This object graph is structurally equivalent to **expanded JSON-LD** and can be
passed directly to any JSON-LD 1.1 processor. Compaction with the standard Etrog
`@context` is provided as a convenience serialization step.

### 4.2 Layered Design

```
┌──────────────────────────────────────────────────────────┐
│  Export layer   │ DICT serializer │ Apple XML serializer │
├──────────────────────────────────────────────────────────┤
│  RDF layer      │ Turtle I/O │ RDF/XML I/O │ JSON-LD I/O │
├──────────────────────────────────────────────────────────┤
│  Builder layer  │ Fluent builder API (entry, sense, …)   │
├──────────────────────────────────────────────────────────┤
│  Core layer     │ Types · Interfaces · Namespaces        │
└──────────────────────────────────────────────────────────┘
```

Each layer depends only on layers below it. The export layer never depends on
the builder layer; exporters accept the plain object graph directly.

### 4.3 URI Strategy

URIs are the identity mechanism for all RDF resources. Etrog follows this policy:

- **Named resources (lexicons, entries, senses, forms):** Use UUIDv5 seeded from
  a deterministic namespace + canonical string, so repeated construction of the
  same resource yields the same URI. Default URI scheme:
  `urn:uuid:<uuidv5>` for locally-minted resources.
- **External resources:** Passed through verbatim. No rewriting.
- **Blank nodes:** Represented as `"_:b<n>"` strings. Discouraged for anything
  that needs to be referenced externally.
- **LexInfo feature values:** Always emitted as full URIs
  (`http://www.lexinfo.net/ontology/3.0/lexinfo#masculine`), never as bare
  strings. TypeScript enums map enum members to their canonical LexInfo URI.

---

## 5. Module Specifications

### 5.1 `@etrog/core` — ontolex Module

Implements all classes and properties from the **ontolex core module** (§3 of
the 2016 spec).

#### Key interfaces

```
/** http://www.w3.org/ns/lemon/ontolex#LexicalEntry */
interface LexicalEntry {
  "@id": URI;
  "@type": "ontolex:LexicalEntry" | URI;

  // Core OntoLex properties
  "ontolex:canonicalForm": Form;
  "ontolex:otherForm"?: Form[];
  "ontolex:lexicalForm"?: Form[];       // alias covering canonical + other
  "ontolex:sense"?: LexicalSense[];
  "ontolex:evokes"?: LexicalConcept[];  // shortcut; prefer via LexicalSense

  // LexInfo properties (values are LexInfo URIs)
  "lexinfo:partOfSpeech"?: LexInfoPartOfSpeech[];

  // LIME metadata
  "lime:language": LanguageTag;         // BCP 47

  // Decomp
  "decomp:subterm"?: Component[];

  // Provenance (DCTerms)
  "dcterms:source"?: URI;
  "dcterms:created"?: XSDDate;
  "dcterms:modified"?: XSDDate;
  "dcterms:creator"?: string;

  // RDFS
  "rdfs:label"?: LangString[];
  "rdfs:comment"?: LangString[];
  "rdfs:seeAlso"?: URI[];
}

/** http://www.w3.org/ns/lemon/ontolex#Form */
interface Form {
  "@id": URI;
  "@type": "ontolex:Form" | URI;
  "ontolex:writtenRep": LangString[];
  "ontolex:phoneticRep"?: LangString[];

  // LexInfo morphosyntactic properties
  "lexinfo:gender"?: LexInfoGender[];
  "lexinfo:number"?: LexInfoNumber[];
  "lexinfo:case"?: LexInfoCase[];
  "lexinfo:tense"?: LexInfoTense[];
  "lexinfo:mood"?: LexInfoMood[];
  "lexinfo:voice"?: LexInfoVoice[];
  "lexinfo:person"?: LexInfoPerson[];
  "lexinfo:degree"?: LexInfoDegree[];
}

/** http://www.w3.org/ns/lemon/ontolex#LexicalSense */
interface LexicalSense {
  "@id": URI;
  "@type": "ontolex:LexicalSense" | URI;
  "ontolex:reference"?: URI;           // link to formal ontology entity
  "ontolex:isLexicalizedSenseOf"?: URI; // link to LexicalConcept
  "skos:definition"?: LangString[];
  "lexicog:usageExample"?: UsageExample[];
  // … vartrans sense relations (see §5.3)
}
```

> **A note on naming conventions.** Etrog uses the actual JSON-LD property key
> syntax (`"ontolex:canonicalForm"`) so that the object is directly
> serializable JSON-LD without a translation step. Compaction with a `@context`
> can shorten these to bare names in exported documents if desired.

### 5.2 `@etrog/core` — lime Module

Implements `lime:Lexicon`, `lime:LexicalizationSet`, `lime:LexicalLinkset`, and
related metadata vocabulary.

```
/** http://www.w3.org/ns/lemon/lime#Lexicon */
interface Lexicon {
  "@id": URI;
  "@type": "lime:Lexicon" | URI;
  "lime:language": LanguageTag;         // MUST be a single BCP 47 tag
  "lime:entry": LexicalEntry[];         // or IRIs referencing external entries
  "lime:lexicalEntries"?: number;       // statistical count

  // Concept set link
  "ontolex:conceptSet"?: URI;          // points to a ConceptSet / skos:ConceptScheme

  // Dublin Core metadata
  "dcterms:title"?: LangString[];
  "dcterms:description"?: LangString[];
  "dcterms:license"?: URI;
  "dcterms:creator"?: string[];
  "dcterms:created"?: XSDDate;
  "dcterms:modified"?: XSDDate;
  "owl:versionInfo"?: string;

  // Namespace declarations (serialization hint, not an RDF property)
  "@context"?: JsonLdContext;
}
```

Note: Per the spec, a `lime:Lexicon` is monolingual (`lime:language` takes
exactly one value). A multilingual resource is modeled as multiple `Lexicon`
instances, linked if desired via a parent `lime:LexicalizationSet` or a SKOS
`ConceptScheme`.

### 5.3 `@etrog/core` — vartrans Module

Implements all classes and properties for lexical variation and translation.

**Fundamental distinction:** `vartrans` offers both *shortcut* properties (no
reification, simple triple) and *reified* relation nodes (carry provenance,
category, source/target). Etrog exposes both forms.

#### Classes

| Class | Description |
|-------|-------------|
| `vartrans:LexicoSemanticRelation` | Abstract base; relates two lexical resources |
| `vartrans:LexicalRelation` | Entry-to-entry form-level relation (abbreviation, derivation, spelling variant) |
| `vartrans:SenseRelation` | Sense-to-sense meaning-level relation (synonymy, antonymy, hypernymy, …) |
| `vartrans:TerminologicalRelation` | Sense variant on a terminological dimension (diatopic, diastratic, diachronic, …) |
| `vartrans:Translation` | Cross-lingual sense equivalence |
| `vartrans:TranslationSet` | Groups `Translation` instances sharing provenance |
| `vartrans:ConceptualRelation` | Concept-to-concept relation (WordNet synset relations) |

#### Shortcut properties

| Property | Domain → Range | Notes |
|----------|---------------|-------|
| `vartrans:translatableAs` | `LexicalEntry` → `LexicalEntry` | Entry-level; symmetric; no sense disambiguation |
| `vartrans:translation` | `LexicalSense` → `LexicalSense` | Sense-level; prefer over `translatableAs` when sense is known |
| `vartrans:senseRel` | `LexicalSense` → `LexicalSense` | Generic; sub-propertied via LexInfo for specific types |
| `vartrans:lexicalRel` | `LexicalEntry` → `LexicalEntry` | Generic; sub-propertied for specific types |
| `vartrans:conceptRel` | `LexicalConcept` → `LexicalConcept` | Concept-level; used for WordNet synset relations |

#### Reification properties

Used on instances of `vartrans:LexicoSemanticRelation`:

| Property | Range | Notes |
|----------|-------|-------|
| `vartrans:source` | lexical resource | The "from" side of an asymmetric relation |
| `vartrans:target` | lexical resource | The "to" side |
| `vartrans:category` | external URI | Type of relation, e.g. `lexinfo:hypernym`, `wn:hypernym` |
| `vartrans:trans` | `Translation` | Links `TranslationSet` to its member translations |

### 5.4 `@etrog/core` — decomp Module

Models morphological decomposition of complex words and multiword expressions.

| Class/Property | Description |
|----------------|-------------|
| `decomp:Component` | A constituent part of a compound/multiword |
| `decomp:subterm` | `LexicalEntry` → `Component` — the immediate constituents |
| `decomp:constituent` | `Component` → `LexicalEntry` — what the component corresponds to at entry level |
| `decomp:correspondsTo` | `Component` → `LexicalEntry` — the lexical entry this component stands for |

### 5.5 `@etrog/core` — synsem Module

Models subcategorization frames and the syntax-semantics interface.

| Class/Property | Description |
|----------------|-------------|
| `synsem:SyntacticFrame` | A syntactic behavior pattern (transitive, intransitive, …) |
| `synsem:SyntacticArgument` | A slot within a syntactic frame |
| `synsem:OntoMap` | Maps a syntactic argument to an ontological predicate |
| `synsem:synBehavior` | `LexicalEntry` → `SyntacticFrame` — the frames a word participates in |
| `synsem:synArg` | `SyntacticFrame` → `SyntacticArgument` |
| `synsem:ontoCorrespondence` | `SyntacticFrame` → `OntoMap` |
| `synsem:subjOfProp` | Maps subject argument to ontology property |
| `synsem:objOfProp` | Maps object argument to ontology property |
| `synsem:isA` | `LexicalEntry` → OWL class — asserts that the entry denotes a member of the class |

LexInfo provides a rich vocabulary of `SyntacticFrame` sub-classes (e.g.,
`lexinfo:TransitiveFrame`, `lexinfo:DitransitiveFrame`, `lexinfo:NounPPFrame`)
and `SyntacticArgument` sub-properties (e.g., `lexinfo:subject`,
`lexinfo:directObject`). These are pre-registered in `@etrog/core`'s LexInfo
module.

### 5.6 `@etrog/core` — lexicog Module

Bridges the OntoLex model to the structural representation of actual dictionary
entries, as defined in the 2019 lexicography spec.

| Class/Property | Description |
|----------------|-------------|
| `lexicog:LexicographicResource` | A structured dictionary or lexicographic work |
| `lexicog:Entry` | One dictionary entry within the resource |
| `lexicog:LexicographicComponent` | A component part of an entry (headword, sense block, …) |
| `lexicog:UsageExample` | A structured usage example with optional source attribution |
| `lexicog:FormRestriction` | Restricts a usage example to a particular form |
| `lexicog:entry` | `LexicographicResource` → `Entry` |
| `lexicog:describes` | `Entry` → `LexicalEntry` (links dictionary entry to the ontolex entry) |
| `lexicog:subComponent` | `LexicographicComponent` → `LexicographicComponent` |
| `lexicog:usageExample` | `LexicalSense` → `UsageExample` |
| `lexicog:restrictedTo` | `UsageExample` → `FormRestriction` |

### 5.7 `@etrog/core` — LexInfo 3.0 Enumerations

The `lexinfo/` sub-module exports TypeScript `const` enumerations for all
morphosyntactic feature categories. Each member's value is the full expanded
LexInfo URI.

```
// Part of Speech (lexinfo:PartOfSpeech individuals)
export const LexInfoPoS = {
  noun:              "http://www.lexinfo.net/ontology/3.0/lexinfo#noun",
  verb:              "http://www.lexinfo.net/ontology/3.0/lexinfo#verb",
  adjective:         "http://www.lexinfo.net/ontology/3.0/lexinfo#adjective",
  adverb:            "http://www.lexinfo.net/ontology/3.0/lexinfo#adverb",
  pronoun:           "http://www.lexinfo.net/ontology/3.0/lexinfo#pronoun",
  preposition:       "http://www.lexinfo.net/ontology/3.0/lexinfo#preposition",
  conjunction:       "http://www.lexinfo.net/ontology/3.0/lexinfo#conjunction",
  determiner:        "http://www.lexinfo.net/ontology/3.0/lexinfo#determiner",
  interjection:      "http://www.lexinfo.net/ontology/3.0/lexinfo#interjection",
  particle:          "http://www.lexinfo.net/ontology/3.0/lexinfo#particle",
  numeral:           "http://www.lexinfo.net/ontology/3.0/lexinfo#numeral",
  properNoun:        "http://www.lexinfo.net/ontology/3.0/lexinfo#properNoun",
  symbol:            "http://www.lexinfo.net/ontology/3.0/lexinfo#symbol",
  abbreviation:      "http://www.lexinfo.net/ontology/3.0/lexinfo#abbreviation",
  acronym:           "http://www.lexinfo.net/ontology/3.0/lexinfo#acronym",
} as const;
export type LexInfoPoS = typeof LexInfoPoS[keyof typeof LexInfoPoS];

// Grammatical gender
export const LexInfoGender = {
  masculine:   "http://www.lexinfo.net/ontology/3.0/lexinfo#masculine",
  feminine:    "http://www.lexinfo.net/ontology/3.0/lexinfo#feminine",
  neuter:      "http://www.lexinfo.net/ontology/3.0/lexinfo#neuter",
  common:      "http://www.lexinfo.net/ontology/3.0/lexinfo#commonGender",
} as const;

// Grammatical number
export const LexInfoNumber = {
  singular:  "http://www.lexinfo.net/ontology/3.0/lexinfo#singular",
  plural:    "http://www.lexinfo.net/ontology/3.0/lexinfo#plural",
  dual:      "http://www.lexinfo.net/ontology/3.0/lexinfo#dual",
} as const;

// Tense
export const LexInfoTense = {
  present:    "http://www.lexinfo.net/ontology/3.0/lexinfo#presentTense",
  past:       "http://www.lexinfo.net/ontology/3.0/lexinfo#pastTense",
  future:     "http://www.lexinfo.net/ontology/3.0/lexinfo#futureTense",
} as const;

// Mood
export const LexInfoMood = {
  indicative:  "http://www.lexinfo.net/ontology/3.0/lexinfo#indicativeMood",
  subjunctive: "http://www.lexinfo.net/ontology/3.0/lexinfo#subjunctiveMood",
  imperative:  "http://www.lexinfo.net/ontology/3.0/lexinfo#imperativeMood",
  conditional: "http://www.lexinfo.net/ontology/3.0/lexinfo#conditionalMood",
  optative:    "http://www.lexinfo.net/ontology/3.0/lexinfo#optativeMood",
} as const;

// (Voice, Person, Case, Degree, Aspect, Definiteness follow the same pattern)
```

> All enum values are URI strings. This makes them immediately usable as RDF
> property values in JSON-LD output without any mapping step.

---

## 6. JSON-LD Strategy

### 6.1 The Standard Etrog Context

The library ships a canonical JSON-LD `@context` document that:

1. Declares all OntoLex-Lemon module namespaces (`ontolex:`, `lime:`,
   `vartrans:`, `decomp:`, `synsem:`, `lexicog:`)
2. Declares companion namespaces (`lexinfo:`, `skos:`, `wn:`, `dbnary:`,
   `dcterms:`, `owl:`, `rdf:`, `rdfs:`)
3. Provides shorthand property aliases for the most commonly used properties so
   that compacted documents are legible (e.g., `"language"` → `"lime:language"`,
   `"canonicalForm"` → `"ontolex:canonicalForm"`)
4. Specifies `@type` coercions for known URI-valued properties (so values are
   treated as IRIs, not strings)
5. Specifies `@language` coercions for `LangString`-valued properties

The context is published at a stable URL and versioned. Consumers that do not
want the Etrog runtime can reference it by URL in their own JSON-LD documents.

### 6.2 Compaction vs. Expansion

- **Expanded form** (internal representation): every property is a full URI
  string, every value is an array, language-tagged strings are objects with
  `@value` and `@language`. This is the canonical form inside Etrog.
- **Compacted form** (output for humans and most consumers): produced by running
  JSON-LD compaction with the standard Etrog context. Shorter property names,
  inline values where possible.
- **Framed form** (structured output for specific entry shapes): JSON-LD framing
  can be used to produce output shaped like `{ entry: [...], concepts: [...] }`
  etc. The `@etrog/rdf` package exposes a `frame()` helper.

### 6.3 Relationship to the GWA WordNet JSON-LD Context

The Global WordNet Association publishes a JSON-LD context for WordNet data at:
`http://globalwordnet.github.io/schemas/wn-json-context-1.4.json`

Etrog's `@etrog/wordnet` package uses this context as a basis for reading and
writing GWA-format JSON. The Etrog standard context is **compatible** with the
GWA context but broader (it covers all OntoLex modules, not just core + lime +
vartrans as the GWA context does).

---

## 7. RDF Round-Trip Strategy

### 7.1 Supported Formats

| Format | Read | Write | MIME type |
|--------|------|-------|-----------|
| JSON-LD 1.1 | ✅ | ✅ | `application/ld+json` |
| Turtle (TTL) | ✅ | ✅ | `text/turtle` |
| RDF/XML | ✅ | ✅ | `application/rdf+xml` |
| N-Triples | ✅ | ✅ | `application/n-triples` |

The `@etrog/rdf` package exposes a unified I/O API across all supported formats:

```
// @etrog/rdf
export async function parseTurtle(input: string | ReadableStream, baseIri?: string): Promise<EtrogDataset>
export async function parseRdfXml(input: string | ReadableStream, baseIri?: string): Promise<EtrogDataset>
export async function parseJsonLd(input: object | string, context?: object): Promise<EtrogDataset>

export async function serializeTurtle(dataset: EtrogDataset, prefixes?: NamespaceMap): Promise<string>
export async function serializeRdfXml(dataset: EtrogDataset, prefixes?: NamespaceMap): Promise<string>
export async function serializeJsonLd(dataset: EtrogDataset, context?: object): Promise<object>

// JSON-LD operations
export async function expand(doc: object): Promise<object[]>
export async function compact(doc: object, context: object): Promise<object>
export async function frame(doc: object, frame: object): Promise<object>

// Conversion helpers
export function datasetToLexicon(dataset: EtrogDataset): Lexicon
export function lexiconToDataset(lexicon: Lexicon): EtrogDataset
```

### 7.2 Round-Trip Fidelity

All tests must verify that:
1. A `Lexicon` object serialized to JSON-LD and parsed back produces an
   object that is deep-equal to the original (`lexicon → jsonld → lexicon`).
2. A `Lexicon` serialized to Turtle, parsed with N3, re-serialized to JSON-LD,
   and parsed back produces an object deep-equal to the original
   (`lexicon → ttl → n3-dataset → jsonld → lexicon`).
3. A `Lexicon` serialized to RDF/XML and parsed back passes the same check.

---

## 8. Export Targets

### 8.1 DICT Format (`@etrog/export-dict`)

The DICT protocol (RFC 2229, port 2628) uses a simple pair of files:

- **`.index`** — tab-delimited: `<headword>\t<base64-offset>\t<base64-length>\n`
- **`.dict`** (or `.dict.dz`, dictzip-compressed) — sequential text blocks,
  seekable via the index

#### Mapping from OntoLex to DICT

| DICT concept | OntoLex source |
|--------------|----------------|
| Headword | `ontolex:writtenRep` of the `ontolex:canonicalForm` |
| Definition block | One per `ontolex:LexicalSense` with a `skos:definition` |
| Cross-references | `vartrans:senseRel` targets rendered as `{see also: word}` markup |
| Part of speech | `lexinfo:partOfSpeech` value, mapped to a human-readable string |
| Pronunciation | `ontolex:phoneticRep` (IPA) |

DICT definition text uses a simple plain-text convention. Etrog will produce
output compatible with the `dictd` server format and DICT protocol clients.

**Dictzip compression** (a seekable gzip variant used by dictd): Implement using
Bun's built-in `Bun.gzip`, producing a header-compatible dictzip
stream. Alternatively, write an uncompressed `.dict` and document that users can
compress with the `dictzip` CLI tool from the `dictd` package.

### 8.2 Apple Dictionary Services XML (`@etrog/export-apple`)

Apple's Dictionary Development Kit (DDK) accepts source files in a **custom XML
format** with a RELAX NG schema. The XML namespace is:
`http://www.apple.com/DTDs/DictionaryService-1.0.rng` (prefix `d:`).

The content inside `<d:entry>` is standard XHTML. Apple's DDK build tool
processes the XML + CSS + Info.plist into a `.dictionary` bundle.

#### Element mapping

| Apple XML element | OntoLex source |
|-------------------|----------------|
| `<d:entry id="…" d:title="…">` | One per `LexicalEntry`; `d:title` = canonical written rep |
| `<d:index d:value="…">` | One per `ontolex:Form` (canonical + other forms), for lookup indexing |
| `<d:index d:value="…" d:yomi="…">` | For Japanese/CJK entries: `d:value` = romanization, `d:yomi` = reading |
| `<h1>` (XHTML) | Headword (canonical written rep) |
| `<span class="part-of-speech">` | LexInfo PoS value, mapped to human-readable string |
| `<span class="pronunciation">` | `ontolex:phoneticRep` (IPA) |
| `<ol class="senses">` + `<li>` | One `<li>` per `ontolex:LexicalSense` |
| `<p class="definition">` | `skos:definition` for the sense |
| `<p class="example">` | `lexicog:usageExample` text |
| `<span class="translation">` | `vartrans:translation` target (written rep + language tag) |
| `<d:parental-control/>` | Triggered by `lexinfo:register` = `lexinfo:vulgar` or similar |

The exporter must produce well-formed XML. Use Bun's built-in text handling or a
lightweight XML builder (no heavyweight DOM library required). The output is a
single UTF-8 encoded `.xml` file ready for use with Apple's DDK `build_dict.sh`
script.

> **No DDK dependency.** Etrog only generates the XML source. Users must install
> Apple's Dictionary Development Kit (available from Apple Developer Downloads as
> part of "Additional Tools for Xcode") to build the final `.dictionary` bundle.
> Etrog should document this requirement clearly in `@etrog/export-apple`'s
> README.

---

## 9. Glossary

| Term | Definition |
|------|------------|
| **BCP 47** | IETF language tag standard (e.g., `en`, `de`, `he`, `yi-Latn`). Used for `lime:language` and `@language` in LangStrings. |
| **Blank node** | An RDF resource with no global URI, identified by a local `_:bN` identifier within a document. |
| **Compaction** | JSON-LD operation that applies a `@context` to shorten expanded property URIs to prefixed names. |
| **ConceptSet** | `ontolex:ConceptSet` — a `skos:ConceptScheme` organizing `LexicalConcept` instances. |
| **DBnary** | A project extracting structured RDF from 26+ Wiktionary editions using OntoLex-Lemon + `dbnary:` extensions. |
| **DDK** | Apple Dictionary Development Kit — the toolchain for building `.dictionary` bundles from XML source files. |
| **DICT** | RFC 2229 dictionary access protocol (TCP port 2628). Used by `dict.org` and the `dictd` server. |
| **Expanded JSON-LD** | JSON-LD form where all property names are full URIs and all values are arrays. The canonical form inside Etrog. |
| **GWA** | Global WordNet Association — publishes the GWA-LMF format and the `wn:` RDF schema used by Open English WordNet. |
| **LangString** | A string value paired with a BCP 47 language tag. Represented as `{ "@value": "…", "@language": "…" }` in expanded JSON-LD. |
| **LIME** | Linguistic Metadata module of OntoLex-Lemon. Provides `lime:Lexicon`, the top-level lexicon container. |
| **LexInfo** | Companion OWL ontology providing a vocabulary of morphosyntactic feature values and syntactic frames for OntoLex. |
| **LLOD** | Linguistic Linked Open Data — the body of language resources published as RDF on the Web. |
| **OntoLex-Lemon** | W3C Community Group specification for encoding lexical information as Linked Data. Six published modules. |
| **OEWN** | Open English WordNet — an open-source fork of Princeton WordNet published in RDF using OntoLex. |
| **Reification** | Modeling a relation as a named RDF node (instead of a direct triple) so that it can carry metadata (provenance, category). Used in `vartrans:LexicoSemanticRelation`. |
| **SKOS** | W3C Simple Knowledge Organization System. `ontolex:LexicalConcept` is a subclass of `skos:Concept`. |
| **Turtle (TTL)** | Terse RDF Triple Language — a compact RDF serialization format. Primary format for OEWN and DBnary dumps. |
| **UUIDv5** | Deterministic UUID generated by hashing a namespace UUID and a local name string (SHA-1). Used for minting stable, reproducible URIs. |
| **vartrans** | OntoLex-Lemon module for modeling lexical variation, sense relations, and translation equivalences. |
