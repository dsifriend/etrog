# @etrog/core

Core TypeScript types, builders, and LexInfo enumerations for the [Etrog](https://github.com/dsifriend/etrog) Linguistic Linked Open Data library.

Implements all published [OntoLex-Lemon](https://www.w3.org/2016/05/ontolex/) modules as JSON-LD-native TypeScript interfaces:

- **ontolex** — `LexicalEntry`, `Form`, `LexicalSense`, `LexicalConcept`
- **lime** — `Lexicon`, `LexicalizationSet`, lexicon metadata
- **vartrans** — sense relations, translations, `TranslationSet`
- **decomp** — morphological decomposition, `Component`
- **synsem** — subcategorization frames, syntax–semantics mapping
- **lexicog** — `LexicographicResource`, `Entry`, `UsageExample`
- **LexInfo 3.0** — `const` enumerations for part of speech, gender, number, tense, mood, voice, case, person, and degree; every value is the full LexInfo URI

Every object produced by `@etrog/core` is valid JSON-LD and can be consumed by any JSON-LD 1.1 processor without an Etrog dependency.

## Installation

```sh
npm install @etrog/core
```

## Usage

```ts
import { LexicalEntryBuilder, LexInfoPoS, langString } from "@etrog/core";

const entry = new LexicalEntryBuilder("https://example.org/entries/run", "en")
  .setCanonicalForm("https://example.org/forms/run", langString("run", "en"))
  .setPartOfSpeech(LexInfoPoS.verb)
  .build();
```

## Documentation

Full API reference, architecture overview, and standards coverage are in the [Etrog monorepo README](https://github.com/dsifriend/etrog#readme).

## License

MIT
