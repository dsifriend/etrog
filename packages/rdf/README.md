# @etrog/rdf

RDF serialization and parsing for the [Etrog](https://github.com/dsifriend/etrog) Linguistic Linked Open Data library.

Provides a unified I/O API across all four supported RDF formats, plus full JSON-LD 1.1 operations:

| Format      | Read | Write |
| ----------- | :--: | :---: |
| JSON-LD 1.1 |  ✅  |  ✅   |
| Turtle      |  ✅  |  ✅   |
| RDF/XML     |  ✅  |  ✅   |
| N-Triples   |  ✅  |  ✅   |

Also exposes `expand`, `compact`, and `frame` from the JSON-LD 1.1 API, and `datasetToLexicon` / `lexiconToDataset` conversion helpers.

## Installation

```sh
npm install @etrog/rdf
```

## Usage

```ts
import { parseTurtle, serializeJsonLd } from "@etrog/rdf";

const dataset = await parseTurtle(turtleString, "https://example.org/");
const jsonld = await serializeJsonLd(dataset);
```

## Documentation

Full API reference and round-trip fidelity requirements are in the [Etrog monorepo README](https://github.com/dsifriend/etrog#readme).

## License

MIT
