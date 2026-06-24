# @etrog/export-apple

Apple Dictionary Services XML exporter for the [Etrog](https://github.com/dsifriend/etrog) Linguistic Linked Open Data library.

Converts an `@etrog/core` `Lexicon` into a well-formed XML source file ready for use with Apple's [Dictionary Development Kit](https://developer.apple.com/download/all/?q=Additional%20Tools) (DDK). The output follows the `d:` namespace schema (`http://www.apple.com/DTDs/DictionaryService-1.0.rng`) with XHTML content inside each `<d:entry>`.

Mapped fields include headwords, all inflected forms (for lookup indexing), part of speech, IPA pronunciation, per-sense definitions, usage examples, and cross-lingual translations. CJK `d:yomi` index attributes are supported where a phonetic representation is present.

> **No DDK dependency.** This package only generates the XML source file. To build the final `.dictionary` bundle you must separately install Apple's Dictionary Development Kit, available from Apple Developer Downloads as part of "Additional Tools for Xcode".

## Installation

```sh
npm install @etrog/export-apple
```

## Usage

```ts
import { exportAppleDictionary } from "@etrog/export-apple";

const xml = exportAppleDictionary(lexicon);
// Write xml to a .xml file, then run Apple DDK's build_dict.sh
```

## Documentation

Full element mapping and export options are in the [Etrog monorepo README](https://github.com/dsifriend/etrog#readme).

## License

MIT
