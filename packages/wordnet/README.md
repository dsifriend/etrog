# @etrog/wordnet

[Open English WordNet](https://en-word.net/) / [GWA](https://globalwordnet.github.io/schemas/) reader for the [Etrog](https://github.com/dsifriend/etrog) Linguistic Linked Open Data library.

Parses Global WordNet Association (GWA) RDF/JSON-LD dumps and maps them to the `@etrog/core` data model — synsets as `LexicalConcept` instances, senses as `LexicalSense`, and synset relations (hypernymy, hyponymy, meronymy, …) as `vartrans:ConceptualRelation` nodes. Uses `@etrog/rdf` under the hood for format parsing.

## Installation

```sh
npm install @etrog/wordnet
```

## Usage

```ts
import { parseWordNet } from "@etrog/wordnet";

const lexicon = await parseWordNet(jsonldDocument);
```

## Documentation

See the [Etrog monorepo README](https://github.com/dsifriend/etrog#readme) for architecture and JSON-LD strategy details, including the relationship to the GWA WordNet JSON-LD context.

## License

MIT
