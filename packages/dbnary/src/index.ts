export {
	DbnaryNamespace,
	DbnaryTranslationCategories,
	DbnaryResourceBase,
	isDbnaryUri,
	isDbnaryResourceIri,
	isDbnaryCategoryTranslation,
} from "./schema";
export type { DbnaryTranslationCategory, DbnaryTranslation } from "./schema";
export { readDbnaryTurtle } from "./reader";
