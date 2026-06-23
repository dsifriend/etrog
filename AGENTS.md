# AGENTS.md — Etrog

Conventions for coding agents and contributors working on Etrog. For project
description, architecture, and module specifications see [`README.md`](./README.md).

---

## Commands

Run from within a `packages/<name>/` directory, or from the repo root to target
all packages via Bun workspaces.

| Task       | Command                                                 |
| ---------- | ------------------------------------------------------- |
| Build      | `bun build ./src/index.ts --outdir ./dist --target bun` |
| Test       | `bun test`                                              |
| Type-check | `tsc --noEmit`                                          |
| Lint       | `bunx @biomejs/biome check ./src`                       |
| Format     | `bunx @biomejs/biome format --write ./src`              |

Run lint and type-check after every non-trivial change.

---

## Bun Runtime

Use `bun` everywhere Node.js tooling would otherwise appear:

| Instead of                                   | Use                |
| -------------------------------------------- | ------------------ |
| `node <file>` / `ts-node <file>`             | `bun <file>`       |
| `npm install` / `yarn` / `pnpm install`      | `bun install`      |
| `npm run <script>` / `yarn run` / `pnpm run` | `bun run <script>` |
| `npx <package>`                              | `bunx <package>`   |

Bun loads `.env` automatically — do not use `dotenv`.

---

## TypeScript

- Strict mode throughout; no `any` unless unavoidable and documented
- `"module": "ESNext"`, `"moduleResolution": "bundler"`
- ESM only — no `require()`, no CJS exports
- Output: `.js` + `.d.ts`

---

## Package Conventions

Every `package.json` under `packages/` must include:

```json
{
  "scripts": {
    "build": "bun build ./src/index.ts --outdir ./dist --target bun",
    "test": "bun test",
    "typecheck": "tsc --noEmit",
    "lint": "bunx @biomejs/biome check ./src",
    "format": "bunx @biomejs/biome format --write ./src"
  }
}
```

All packages are scoped to `@etrog` and versioned in lockstep. Breaking changes
to public TypeScript types require a major version bump.

---

## RDF Dependencies

`@etrog/rdf` wraps these three packages — do not reach for alternatives:

- **`n3`** — Turtle / N-Triples / N-Quads parser and serializer
- **`rdfxml-streaming-parser`** — streaming RDF/XML parser, compatible with `n3`'s `DataFactory`
- **`jsonld`** — JSON-LD 1.1 expand / compact / flatten / frame

Type declarations: add `@types/n3` and `@types/jsonld` if not bundled.

---

## Code Style

### No Magic Strings

All ontology terms — property names, class URIs, feature values — must come from
named exports, never bare string literals. Use:

- `Namespaces` — prefix → URI mappings
- `LexInfoPoS`, `LexInfoGender`, etc. — const enumerations; values are full LexInfo URIs
- `OntolexTypes`, `LimeTypes`, `VartransTypes`, etc. — `@type` constants
- `qname(prefix, local)` — constructs `"prefix:local"` for JSON-LD property keys

### Builder Pattern

Builders must be:

- **Fluent** — every setter returns `this`
- **Incremental** — `build()` is valid at any point; `@id` and `@type` are set by the constructor
- **Idempotent** — duplicate senses, forms, or relations are deduplicated by `@id`
- **Non-null-safe internals** — when lazily initializing builder arrays, prefer nullish coalescing assignment in statement form (for example, `this.data["ontolex:sense"] ??= []; const items = this.data["ontolex:sense"];`) instead of non-null assertions (`!`) or assignment-in-expression patterns.

`build()` returns the plain interface type, not a `Builder` wrapper.

### LangString

Use `LangString[]` for all potentially multilingual text. Construct with
`langString(value, lang)` or `langStringMap(record)`. Read with
`getValueForLang(strings, lang)`, which falls back to `"und"` or first available.

### JSDoc

Every exported type, interface, and function requires:

- One-sentence description
- `@param` for every parameter
- `@returns` description
- At least one `@example` on builder methods and serializer functions

---

## Testing

Use `bun test`. Test files live under `test/` within each package. Every public
interface needs a corresponding test file. Import from `bun:test`:

```ts
import { test, expect } from "bun:test";
```

- **Builder tests** — construct a minimal valid object; assert output matches the expected JSON-LD expanded form
- **Serializer tests** — round-trip each format; see "Round-Trip Fidelity" in `README.md §7`
- **LexInfo enum tests** — assert each enum value resolves to the correct full URI
