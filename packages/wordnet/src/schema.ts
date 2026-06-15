import type { ConceptualRelation, SenseRelation, URI } from "@etrog/core";
import { Namespaces } from "@etrog/core";

/** The canonical `wn:` namespace URI. */
export const WnNamespace = Namespaces.wn;

/**
 * Common `wn:` relation category URIs used with `vartrans:category`.
 *
 * @example
 * const category = WnRelationCategories.hypernym;
 */
export const WnRelationCategories = {
	antonym: `${Namespaces.wn}antonym` as URI,
	also: `${Namespaces.wn}also` as URI,
	derivation: `${Namespaces.wn}derivation` as URI,
	domainTopic: `${Namespaces.wn}domain_topic` as URI,
	hasDomainTopic: `${Namespaces.wn}has_domain_topic` as URI,
	domainRegion: `${Namespaces.wn}domain_region` as URI,
	hasDomainRegion: `${Namespaces.wn}has_domain_region` as URI,
	exemplifies: `${Namespaces.wn}exemplifies` as URI,
	isExemplifiedBy: `${Namespaces.wn}is_exemplified_by` as URI,
	hypernym: `${Namespaces.wn}hypernym` as URI,
	hyponym: `${Namespaces.wn}hyponym` as URI,
	instanceHypernym: `${Namespaces.wn}instance_hypernym` as URI,
	instanceHyponym: `${Namespaces.wn}instance_hyponym` as URI,
	meroMember: `${Namespaces.wn}mero_member` as URI,
	holoMember: `${Namespaces.wn}holo_member` as URI,
	meroPart: `${Namespaces.wn}mero_part` as URI,
	holoPart: `${Namespaces.wn}holo_part` as URI,
	meroSubstance: `${Namespaces.wn}mero_substance` as URI,
	holoSubstance: `${Namespaces.wn}holo_substance` as URI,
	entails: `${Namespaces.wn}entails` as URI,
	isEntailedBy: `${Namespaces.wn}is_entailed_by` as URI,
	causes: `${Namespaces.wn}causes` as URI,
	isCausedBy: `${Namespaces.wn}is_caused_by` as URI,
	similar: `${Namespaces.wn}similar` as URI,
	attribute: `${Namespaces.wn}attribute` as URI,
} as const;

/** Union type of known `wn:` relation category URIs. */
export type WnRelationCategory =
	(typeof WnRelationCategories)[keyof typeof WnRelationCategories];

/**
 * A WordNet sense-level relation represented in Etrog as `vartrans:SenseRelation`.
 *
 * @example
 * const rel: WnSenseRelation = {
 *   "@id": "https://example.org/r1" as URI,
 *   "@type": "vartrans:SenseRelation",
 *   "vartrans:source": "https://example.org/sense/a" as URI,
 *   "vartrans:target": "https://example.org/sense/b" as URI,
 *   "vartrans:category": WnRelationCategories.hypernym,
 * };
 */
export interface WnSenseRelation
	extends Omit<SenseRelation, "vartrans:category"> {
	"vartrans:category": WnRelationCategory;
}

/**
 * A WordNet concept-level relation represented in Etrog as `vartrans:ConceptualRelation`.
 *
 * @example
 * const rel: WnConceptualRelation = {
 *   "@id": "https://example.org/r2" as URI,
 *   "@type": "vartrans:ConceptualRelation",
 *   "vartrans:source": "https://example.org/concept/a" as URI,
 *   "vartrans:target": "https://example.org/concept/b" as URI,
 *   "vartrans:category": WnRelationCategories.hypernym,
 * };
 */
export interface WnConceptualRelation
	extends Omit<ConceptualRelation, "vartrans:category"> {
	"vartrans:category": WnRelationCategory;
}

/**
 * Returns true when a URI belongs to the `wn:` namespace.
 *
 * @param uri - The URI to inspect.
 * @returns `true` if the URI starts with the WordNet namespace.
 *
 * @example
 * isWnUri("https://globalwordnet.github.io/schemas/wn#hypernym" as URI);
 */
export function isWnUri(uri: URI): boolean {
	return uri.startsWith(WnNamespace);
}

/**
 * Returns true when a relation has a `wn:` category URI.
 *
 * @param relation - The relation to inspect.
 * @returns `true` if `vartrans:category` exists and is in the `wn:` namespace.
 *
 * @example
 * isWnCategoryRelation(rel);
 */
export function isWnCategoryRelation(
	relation: Pick<SenseRelation | ConceptualRelation, "vartrans:category">,
): boolean {
	const category = relation["vartrans:category"];
	return typeof category === "string" && category.startsWith(WnNamespace);
}
