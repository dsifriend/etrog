import type { Translation, URI } from "@etrog/core";
import { Namespaces } from "@etrog/core";

/** The canonical `dbnary:` namespace URI. */
export const DbnaryNamespace = Namespaces.dbnary;

/** The canonical DBnary resource IRI base (non-hash namespace). */
export const DbnaryResourceBase = "http://kaiko.getalp.org/dbnary/";

/**
 * DBnary translation-related category URIs usable with `vartrans:category`.
 *
 * These are real DBnary vocabulary terms from the published DBnary ontology
 * (`http://kaiko.getalp.org/dbnary`).
 *
 * @example
 * const category = DbnaryTranslationCategories.isTranslationOf;
 */
export const DbnaryTranslationCategories = {
	translationClass: `${Namespaces.dbnary}Translation` as URI,
	isTranslationOf: `${Namespaces.dbnary}isTranslationOf` as URI,
	targetLanguage: `${Namespaces.dbnary}targetLanguage` as URI,
	targetLanguageCode: `${Namespaces.dbnary}targetLanguageCode` as URI,
	usage: `${Namespaces.dbnary}usage` as URI,
	gloss: `${Namespaces.dbnary}gloss` as URI,
	writtenForm: `${Namespaces.dbnary}writtenForm` as URI,
} as const;

/** Union type of known translation-related DBnary category URIs. */
export type DbnaryTranslationCategory =
	(typeof DbnaryTranslationCategories)[keyof typeof DbnaryTranslationCategories];

/**
 * A DBnary translation relation represented in Etrog as `vartrans:Translation`.
 *
 * @example
 * const rel: DbnaryTranslation = {
 *   "@id": "http://kaiko.getalp.org/dbnary/eng/__tr_dog__fra__chien__1" as URI,
 *   "@type": "vartrans:Translation",
 *   "vartrans:source": "http://kaiko.getalp.org/dbnary/eng/_bis__dog__Noun__1" as URI,
 *   "vartrans:target": "http://kaiko.getalp.org/dbnary/fra/__ws_1__chien__Nom__1" as URI,
 *   "vartrans:category": DbnaryTranslationCategories.isTranslationOf,
 * };
 */
export interface DbnaryTranslation
	extends Omit<Translation, "vartrans:category"> {
	"vartrans:category": DbnaryTranslationCategory;
}

/**
 * Returns true when a URI belongs to the `dbnary:` vocabulary namespace.
 *
 * DBnary resource IRIs commonly use ISO 639-3 language codes in the path
 * (for example, `.../eng/...` or `.../fra/...`), while vocabulary terms stay
 * under the hash namespace (`http://kaiko.getalp.org/dbnary#...`).
 *
 * @param uri - The URI to inspect.
 * @returns `true` if the URI starts with the DBnary vocabulary namespace.
 *
 * @example
 * isDbnaryUri("http://kaiko.getalp.org/dbnary#isTranslationOf" as URI);
 */
export function isDbnaryUri(uri: URI): boolean {
	return uri.startsWith(DbnaryNamespace);
}

/**
 * Returns true when a URI matches the DBnary resource IRI pattern.
 *
 * DBnary resource IRIs are expected to use the non-hash base
 * `http://kaiko.getalp.org/dbnary/`, followed by a graph/language segment
 * (commonly ISO 639-3 like `eng` or graph variants like `eng_exolex`) and at
 * least one additional path segment for the resource identifier.
 *
 * @param uri - The URI to inspect.
 * @returns `true` if the URI looks like a DBnary resource IRI.
 *
 * @example
 * isDbnaryResourceIri("http://kaiko.getalp.org/dbnary/eng/_bis__dog__Noun__1" as URI);
 */
export function isDbnaryResourceIri(uri: URI): boolean {
	if (!uri.startsWith(DbnaryResourceBase)) {
		return false;
	}

	const relative = uri.slice(DbnaryResourceBase.length);
	const firstSlashIndex = relative.indexOf("/");
	if (firstSlashIndex <= 0 || firstSlashIndex === relative.length - 1) {
		return false;
	}

	const graphSegment = relative.slice(0, firstSlashIndex);
	const resourceSegment = relative.slice(firstSlashIndex + 1);
	const graphPattern = /^[a-z]{3}(?:_[a-z]+)?$/;

	return graphPattern.test(graphSegment) && resourceSegment.length > 0;
}

/**
 * Returns true when a translation has a `dbnary:` category URI.
 *
 * @param translation - The translation relation to inspect.
 * @returns `true` if `vartrans:category` exists and is in the `dbnary:` namespace.
 *
 * @example
 * isDbnaryCategoryTranslation(rel);
 */
export function isDbnaryCategoryTranslation(
	translation: Pick<Translation, "vartrans:category">,
): boolean {
	const category = translation["vartrans:category"];
	return typeof category === "string" && category.startsWith(DbnaryNamespace);
}
