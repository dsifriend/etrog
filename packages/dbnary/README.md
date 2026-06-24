# @etrog/dbnary

[DBnary](http://kaiko.getalp.org/about-dbnary/) reader for the [Etrog](https://github.com/dsifriend/etrog) Linguistic Linked Open Data library.

Parses DBnary RDF dumps and maps them to the `@etrog/core` data model (`Lexicon`, `LexicalEntry`, `LexicalSense`, `vartrans` translation relations). Uses `@etrog/rdf` under the hood for format parsing, so Turtle, RDF/XML, N-Triples, and JSON-LD input are all supported.

## Installation

```sh
npm install @etrog/dbnary
```

## Usage

```ts
import { parseDbnary } from "@etrog/dbnary";

const lexicon = await parseDbnary(turtleStream, { language: "en" });
```

## Documentation

See the [Etrog monorepo README](https://github.com/dsifriend/etrog#readme) for architecture and standards coverage details.

## License

MIT
