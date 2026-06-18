import type {
	LangString,
	LanguageTag,
	LexicalEntry,
	LexicalSense,
	Lexicon,
	URI,
	UsageExample,
} from "@etrog/core";
import { getValueForLang, LexInfoRegister, qname } from "@etrog/core";

const APPLE_DDS_NAMESPACE =
	"http://www.apple.com/DTDs/DictionaryService-1.0.rng";
const XHTML_NAMESPACE = "http://www.w3.org/1999/xhtml";

const ONTOLEX_CANONICAL_FORM = qname(
	"ontolex",
	"canonicalForm",
) as "ontolex:canonicalForm";
const ONTOLEX_OTHER_FORM = qname("ontolex", "otherForm") as "ontolex:otherForm";
const ONTOLEX_WRITTEN_REP = qname(
	"ontolex",
	"writtenRep",
) as "ontolex:writtenRep";
const ONTOLEX_PHONETIC_REP = qname(
	"ontolex",
	"phoneticRep",
) as "ontolex:phoneticRep";
const ONTOLEX_SENSE = qname("ontolex", "sense") as "ontolex:sense";
const LEXINFO_PART_OF_SPEECH = qname(
	"lexinfo",
	"partOfSpeech",
) as "lexinfo:partOfSpeech";
const LEXINFO_REGISTER = qname("lexinfo", "register") as "lexinfo:register";
const SKOS_DEFINITION = qname("skos", "definition") as "skos:definition";
const LEXICOG_USAGE_EXAMPLE = qname(
	"lexicog",
	"usageExample",
) as "lexicog:usageExample";
const RDF_VALUE = qname("rdf", "value") as "rdf:value";
const VARTRANS_TRANSLATION = qname(
	"vartrans",
	"translation",
) as "vartrans:translation";
const VARTRANS_TARGET = qname("vartrans", "target") as "vartrans:target";

interface TranslationTarget {
	headword: string;
	language: LanguageTag;
}

/** Options controlling Apple Dictionary XML serialization behavior. */
export interface AppleDictionarySerializerOptions {
	/**
	 * Preferred language for selecting multilingual strings.
	 * Defaults to the lexicon's `lime:language`.
	 */
	language?: LanguageTag;
	/**
	 * Whether to treat `LexInfoRegister.tabooRegister` as inappropriate content.
	 *
	 * When `false` (default), only `LexInfoRegister.vulgarRegister` triggers
	 * `<d:parental-control/>`.
	 */
	treatTabooRegisterAsInappropriate?: boolean;
}

/** Result of serializing a lexicon to Apple Dictionary Services XML. */
export interface AppleDictionarySerializationResult {
	/** UTF-8 XML source content ready for Apple's DDK `build_dict.sh`. */
	xml: string;
}

/**
 * Serializes an Etrog `Lexicon` to Apple Dictionary Services (DDS) XML source.
 *
 * @param lexicon - Source lexicon to serialize.
 * @param options - Optional serialization behavior flags.
 * @returns A single XML payload suitable for Apple DDK input.
 *
 * @example
 * const result = serializeAppleDictionaryXml(lexicon);
 * await Bun.write("MyDictionary.xml", result.xml);
 */
export function serializeAppleDictionaryXml(
	lexicon: Lexicon,
	options: AppleDictionarySerializerOptions = {},
): AppleDictionarySerializationResult {
	const language = options.language ?? lexicon["lime:language"];
	const treatTabooRegisterAsInappropriate =
		options.treatTabooRegisterAsInappropriate ?? false;
	const translationTargetMap = buildTranslationTargetMap(lexicon, language);

	const entryXml = lexicon["lime:entry"]
		.map((entry) =>
			renderEntryXml(
				entry,
				language,
				translationTargetMap,
				treatTabooRegisterAsInappropriate,
			),
		)
		.filter((entry): entry is string => entry !== undefined)
		.join("\n");

	const xml = [
		'<?xml version="1.0" encoding="UTF-8"?>',
		`<d:dictionary xmlns:d="${APPLE_DDS_NAMESPACE}" xmlns="${XHTML_NAMESPACE}">`,
		entryXml,
		"</d:dictionary>",
	]
		.filter((line) => line.length > 0)
		.join("\n");

	return { xml };
}

function renderEntryXml(
	entry: LexicalEntry,
	language: LanguageTag,
	translationTargetMap: Map<URI, TranslationTarget>,
	treatTabooRegisterAsInappropriate: boolean,
): string | undefined {
	const headword = selectLangValue(
		entry[ONTOLEX_CANONICAL_FORM][ONTOLEX_WRITTEN_REP],
		language,
	);
	if (!headword) {
		return undefined;
	}

	const title = escapeXmlAttribute(headword);
	const entryId = escapeXmlAttribute(String(entry["@id"]));
	const lines: string[] = [
		`  <d:entry id="${entryId}" d:title="${title}">`,
		...renderIndexes(entry, language),
		`    <h1>${escapeXmlText(headword)}</h1>`,
	];

	const pos = renderPartOfSpeech(entry[LEXINFO_PART_OF_SPEECH]?.[0]);
	if (pos) {
		lines.push(`    <span class="part-of-speech">${escapeXmlText(pos)}</span>`);
	}

	const pronunciation = selectLangValue(
		entry[ONTOLEX_CANONICAL_FORM][ONTOLEX_PHONETIC_REP],
		language,
	);
	if (pronunciation) {
		lines.push(
			`    <span class="pronunciation">${escapeXmlText(pronunciation)}</span>`,
		);
	}

	const senseLines = renderSenses(
		entry,
		language,
		translationTargetMap,
		treatTabooRegisterAsInappropriate,
	);
	if (senseLines.length > 0) {
		lines.push(...senseLines);
	}

	if (entryHasParentalControlFlag(entry, treatTabooRegisterAsInappropriate)) {
		lines.push("    <d:parental-control/>");
	}

	lines.push("  </d:entry>");
	return lines.join("\n");
}

function renderIndexes(entry: LexicalEntry, language: LanguageTag): string[] {
	const forms = [
		entry[ONTOLEX_CANONICAL_FORM],
		...(entry[ONTOLEX_OTHER_FORM] ?? []),
	];
	const indexValues = new Set<string>();
	for (const form of forms) {
		const written = selectLangValue(form[ONTOLEX_WRITTEN_REP], language);
		if (written) {
			indexValues.add(normalizeIndexValue(written));
		}
	}

	return [...indexValues].map(
		(value) => `    <d:index d:value="${escapeXmlAttribute(value)}"/>`,
	);
}

function renderSenses(
	entry: LexicalEntry,
	language: LanguageTag,
	translationTargetMap: Map<URI, TranslationTarget>,
	treatTabooRegisterAsInappropriate: boolean,
): string[] {
	const senses = entry[ONTOLEX_SENSE] ?? [];
	const senseItems = senses
		.map((sense) =>
			renderSenseItem(
				sense,
				language,
				translationTargetMap,
				treatTabooRegisterAsInappropriate,
			),
		)
		.filter((line): line is string => line !== undefined);

	if (senseItems.length === 0) {
		return [];
	}

	return ['    <ol class="senses">', ...senseItems, "    </ol>"];
}

function renderSenseItem(
	sense: LexicalSense,
	language: LanguageTag,
	translationTargetMap: Map<URI, TranslationTarget>,
	treatTabooRegisterAsInappropriate: boolean,
): string | undefined {
	const definition = selectLangValue(sense[SKOS_DEFINITION], language);
	const exampleLines = renderUsageExamples(
		sense[LEXICOG_USAGE_EXAMPLE],
		language,
	);
	const translationLines = renderTranslations(sense, translationTargetMap);

	if (
		!definition &&
		exampleLines.length === 0 &&
		translationLines.length === 0
	) {
		return undefined;
	}

	const lines: string[] = ["      <li>"];
	if (definition) {
		lines.push(
			`        <p class="definition">${escapeXmlText(definition)}</p>`,
		);
	}
	lines.push(...exampleLines, ...translationLines);

	if (senseHasParentalControlFlag(sense, treatTabooRegisterAsInappropriate)) {
		lines.push("        <d:parental-control/>");
	}

	lines.push("      </li>");
	return lines.join("\n");
}

function renderUsageExamples(
	usageExamples: UsageExample[] | undefined,
	language: LanguageTag,
): string[] {
	if (!usageExamples || usageExamples.length === 0) {
		return [];
	}

	const lines: string[] = [];
	for (const usageExample of usageExamples) {
		const value = selectLangValue(usageExample[RDF_VALUE], language);
		if (!value) {
			continue;
		}
		lines.push(`        <p class="example">${escapeXmlText(value)}</p>`);
	}
	return lines;
}

function renderTranslations(
	sense: LexicalSense,
	translationTargetMap: Map<URI, TranslationTarget>,
): string[] {
	const translations = sense[VARTRANS_TRANSLATION] ?? [];
	const rendered = new Set<string>();
	for (const translation of translations) {
		const target = translation[VARTRANS_TARGET];
		if (!target) {
			continue;
		}
		const targetInfo = translationTargetMap.get(target);
		if (!targetInfo) {
			continue;
		}
		rendered.add(`${targetInfo.headword} (${targetInfo.language})`);
	}

	if (rendered.size === 0) {
		return [];
	}

	return [...rendered].map((translationText) => {
		const escaped = escapeXmlText(translationText);
		return `        <span class="translation">${escaped}</span>`;
	});
}

function buildTranslationTargetMap(
	lexicon: Lexicon,
	language: LanguageTag,
): Map<URI, TranslationTarget> {
	const map = new Map<URI, TranslationTarget>();

	for (const entry of lexicon["lime:entry"]) {
		const entryHeadword = selectLangValue(
			entry[ONTOLEX_CANONICAL_FORM][ONTOLEX_WRITTEN_REP],
			language,
		);
		if (!entryHeadword) {
			continue;
		}

		const entryLanguage = entry["lime:language"];
		for (const sense of entry[ONTOLEX_SENSE] ?? []) {
			map.set(sense["@id"], {
				headword: entryHeadword,
				language: entryLanguage,
			});
		}
	}

	return map;
}

function selectLangValue(
	values: LangString[] | undefined,
	language: LanguageTag,
): string | undefined {
	if (!values || values.length === 0) {
		return undefined;
	}
	return getValueForLang(values, language);
}

function normalizeIndexValue(value: string): string {
	return value.replaceAll(/\s+/g, " ").trim();
}

function renderPartOfSpeech(posUri: string | undefined): string | undefined {
	if (!posUri) {
		return undefined;
	}

	const fragment = posUri.includes("#")
		? posUri.slice(posUri.indexOf("#") + 1)
		: posUri;
	const withSpaces = fragment
		.replaceAll("-", " ")
		.replaceAll(/([a-z])([A-Z])/g, "$1 $2");
	return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}

function entryHasParentalControlFlag(
	entry: LexicalEntry,
	treatTabooRegisterAsInappropriate: boolean,
): boolean {
	for (const sense of entry[ONTOLEX_SENSE] ?? []) {
		if (senseHasParentalControlFlag(sense, treatTabooRegisterAsInappropriate)) {
			return true;
		}
	}
	return false;
}

function senseHasParentalControlFlag(
	sense: LexicalSense,
	treatTabooRegisterAsInappropriate: boolean,
): boolean {
	const registerValues = sense[LEXINFO_REGISTER] ?? [];
	if (registerValues.includes(LexInfoRegister.vulgarRegister)) {
		return true;
	}

	if (
		treatTabooRegisterAsInappropriate &&
		registerValues.includes(LexInfoRegister.tabooRegister)
	) {
		return true;
	}

	return false;
}

function escapeXmlAttribute(value: string): string {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;");
}

function escapeXmlText(value: string): string {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;");
}
