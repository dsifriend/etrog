/** Public exports for @etrog/core — re-export builders, utilities, namespaces, and module interfaces. */

export { ComponentBuilder } from "./builders/ComponentBuilder.js";
export { ConceptSetBuilder } from "./builders/ConceptSetBuilder.js";
export { ConceptualizationSetBuilder } from "./builders/ConceptualizationSetBuilder.js";
export { FormBuilder } from "./builders/FormBuilder.js";
export { LexicalConceptBuilder } from "./builders/LexicalConceptBuilder.js";
export { LexicalEntryBuilder } from "./builders/LexicalEntryBuilder.js";
export { LexicalizationSetBuilder } from "./builders/LexicalizationSetBuilder.js";
export { LexicalLinksetBuilder } from "./builders/LexicalLinksetBuilder.js";
export { LexicalSenseBuilder } from "./builders/LexicalSenseBuilder.js";
export { LexiconBuilder } from "./builders/LexiconBuilder.js";
export { EntryBuilder } from "./builders/lexicog/EntryBuilder.js";
export { FormRestrictionBuilder } from "./builders/lexicog/FormRestrictionBuilder.js";
export { LexicographicComponentBuilder } from "./builders/lexicog/LexicographicComponentBuilder.js";
export { LexicographicResourceBuilder } from "./builders/lexicog/LexicographicResourceBuilder.js";
export { UsageExampleBuilder } from "./builders/lexicog/UsageExampleBuilder.js";
export { OntoMapBuilder } from "./builders/synsem/OntoMapBuilder.js";
export { SyntacticArgumentBuilder } from "./builders/synsem/SyntacticArgumentBuilder.js";
export { SyntacticFrameBuilder } from "./builders/synsem/SyntacticFrameBuilder.js";
export { ConceptualRelationBuilder } from "./builders/vartrans/ConceptualRelationBuilder.js";
export { LexicalRelationBuilder } from "./builders/vartrans/LexicalRelationBuilder.js";
export { SenseRelationBuilder } from "./builders/vartrans/SenseRelationBuilder.js";
export { TerminologicalRelationBuilder } from "./builders/vartrans/TerminologicalRelationBuilder.js";
export { TranslationBuilder } from "./builders/vartrans/TranslationBuilder.js";
export { TranslationSetBuilder } from "./builders/vartrans/TranslationSetBuilder.js";
export * from "./context/index.js";
export * from "./decomp/index.js";

export * from "./langstring.js";
export * from "./lexicog/index.js";
export * from "./lexinfo/index.js";
export * from "./lime/index.js";

export * from "./namespaces.js";

export * from "./ontolex/index.js";
export * from "./skos/index.js";
export * from "./synsem/index.js";
export * from "./types/index.js";
export * from "./types/uri.js";
export * from "./vartrans/index.js";
