// Foundational types
export * from "./types/index.js";
export * from "./types/uri.js";

// Namespaces and context
export * from "./namespaces.js";
export * from "./context/index.js";

// LangString utilities
export * from "./langstring.js";

// Module interfaces
export * from "./ontolex/index.js";
export * from "./lime/index.js";
export * from "./vartrans/index.js";
export * from "./decomp/index.js";
export * from "./synsem/index.js";
export * from "./lexicog/index.js";
export * from "./lexinfo/index.js";
export * from "./skos/index.js";

// Builders
export { FormBuilder } from "./builders/FormBuilder.js";
export { LexicalSenseBuilder } from "./builders/LexicalSenseBuilder.js";
export { LexicalEntryBuilder } from "./builders/LexicalEntryBuilder.js";
export { LexiconBuilder } from "./builders/LexiconBuilder.js";
export { SenseRelationBuilder } from "./builders/vartrans/SenseRelationBuilder.js";
export { TranslationBuilder } from "./builders/vartrans/TranslationBuilder.js";
export { TranslationSetBuilder } from "./builders/vartrans/TranslationSetBuilder.js";
