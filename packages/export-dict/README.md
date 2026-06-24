# @etrog/export-dict

DICT protocol exporter for the [Etrog](https://github.com/dsifriend/etrog) Linguistic Linked Open Data library.

Converts an `@etrog/core` `Lexicon` into the two-file format used by the [DICT protocol](https://datatracker.ietf.org/doc/html/rfc2229) (RFC 2229, port 2628):

- **`.index`** — tab-delimited headword / base64-offset / base64-length entries
- **`.dict`** — sequential plain-text definition blocks, seekable via the index

Compatible with `dictd` and any RFC 2229 DICT client. Mapped fields include headwords, part of speech, IPA pronunciation, per-sense definitions, and `{see also}` cross-references from `vartrans` sense relations.

## Installation

```sh
npm install @etrog/export-dict
```

## Usage

```ts
import { exportDict } from "@etrog/export-dict";

const { index, dict } = exportDict(lexicon);
await Bun.write("my-dictionary.index", index);
await Bun.write("my-dictionary.dict", dict);
```

## Documentation

Full field mapping and dictzip compression notes are in the [Etrog monorepo README](https://github.com/dsifriend/etrog#readme).

## License

MIT
