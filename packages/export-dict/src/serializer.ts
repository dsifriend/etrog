import type {
	LangString,
	LanguageTag,
	LexicalEntry,
	LexicalSense,
	Lexicon,
	URI,
} from "@etrog/core";
import { getValueForLang, qname } from "@etrog/core";

const ONTOLEX_CANONICAL_FORM = qname(
	"ontolex",
	"canonicalForm",
) as "ontolex:canonicalForm";
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
const SKOS_DEFINITION = qname("skos", "definition") as "skos:definition";
const VARTRANS_SENSE_REL = qname("vartrans", "senseRel") as "vartrans:senseRel";
const VARTRANS_TARGET = qname("vartrans", "target") as "vartrans:target";

const DICT_BASE64_ALPHABET =
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

interface DictRecord {
	headword: string;
	definitionText: string;
}

/** Options controlling DICT export behavior. */
export interface DictSerializerOptions {
	/**
	 * Preferred language for selecting multilingual strings.
	 * Defaults to the lexicon's `lime:language`.
	 */
	language?: LanguageTag;
}

/** Result of serializing a lexicon to DICT assets. */
export interface DictSerializationResult {
	/** Tab-delimited DICT index content (`.index`). */
	index: string;
	/** Plain-text DICT dictionary payload (`.dict`). */
	dict: string;
}

/**
 * Serializes an Etrog `Lexicon` into DICT-compatible `.index` + `.dict` content.
 *
 * @param lexicon - Source lexicon to serialize.
 * @param options - Optional serialization behavior flags.
 * @returns The generated DICT index and uncompressed dictionary content.
 *
 * @example
 * const result = await serializeDict(lexicon);
 * await Bun.write("mydict.index", result.index);
 * await Bun.write("mydict.dict", result.dict);
 * // For dictzip-compatible compression, run: dictzip mydict.dict
 */
export function serializeDict(
	lexicon: Lexicon,
	options: DictSerializerOptions = {},
): DictSerializationResult {
	const language = options.language ?? lexicon["lime:language"];
	const records = buildDictRecords(lexicon, language).sort((a, b) =>
		a.headword.localeCompare(b.headword),
	);

	const encoder = new TextEncoder();
	let offset = 0;
	let dict = "";
	let index = "";

	for (const record of records) {
		const normalizedHeadword = normalizeHeadword(record.headword);
		const payload = `${record.definitionText}\n`;
		const length = encoder.encode(payload).byteLength;

		dict += payload;
		index += `${normalizedHeadword}\t${encodeDictBase64Integer(offset)}\t${encodeDictBase64Integer(length)}\n`;
		offset += length;
	}

	return { index, dict };
}

/**
 * Encodes a non-negative integer as DICT index base64 text.
 *
 * @param value - Integer to encode.
 * @returns DICT base64 string representation.
 *
 * @example
 * encodeDictBase64Integer(0) // => "A"
 */
export function encodeDictBase64Integer(value: number): string {
	if (!Number.isInteger(value) || value < 0) {
		throw new Error("DICT base64 encoding requires a non-negative integer.");
	}

	if (value === 0) {
		return DICT_BASE64_ALPHABET[0] as string;
	}

	let remaining = value;
	let encoded = "";
	while (remaining > 0) {
		const index = remaining % 64;
		encoded = `${DICT_BASE64_ALPHABET[index]}${encoded}`;
		remaining = Math.floor(remaining / 64);
	}
	return encoded;
}

/**
 * Decodes a DICT index base64 integer string.
 *
 * @param value - DICT base64 integer string.
 * @returns Decoded non-negative integer value.
 *
 * @example
 * decodeDictBase64Integer("A") // => 0
 */
export function decodeDictBase64Integer(value: string): number {
	if (value.length === 0) {
		throw new Error("Cannot decode an empty DICT base64 integer string.");
	}

	let decoded = 0;
	for (const ch of value) {
		const digit = DICT_BASE64_ALPHABET.indexOf(ch);
		if (digit === -1) {
			throw new Error(`Invalid DICT base64 digit: ${ch}`);
		}
		decoded = decoded * 64 + digit;
	}
	return decoded;
}

function buildDictRecords(
	lexicon: Lexicon,
	language: LanguageTag,
): DictRecord[] {
	const senseHeadwordMap = new Map<URI, string>();
	for (const entry of lexicon["lime:entry"]) {
		const headword = selectHeadword(entry, language);
		if (!headword) {
			continue;
		}

		for (const sense of entry[ONTOLEX_SENSE] ?? []) {
			senseHeadwordMap.set(sense["@id"], headword);
		}
	}

	const records: DictRecord[] = [];
	for (const entry of lexicon["lime:entry"]) {
		const headword = selectHeadword(entry, language);
		if (!headword) {
			continue;
		}

		const definitionText = renderDefinitionBlock(
			entry,
			language,
			senseHeadwordMap,
		);
		records.push({ headword, definitionText });
	}

	return records;
}

function renderDefinitionBlock(
	entry: LexicalEntry,
	language: LanguageTag,
	senseHeadwordMap: Map<URI, string>,
): string {
	const headword = selectHeadword(entry, language) ?? String(entry["@id"]);
	const lines: string[] = [headword];

	const pos = renderPartOfSpeech(entry[LEXINFO_PART_OF_SPEECH]?.[0]);
	if (pos) {
		lines.push(`Part of speech: ${pos}`);
	}

	const phoneticRepresentation = selectLangValue(
		entry[ONTOLEX_CANONICAL_FORM][ONTOLEX_PHONETIC_REP],
		language,
	);
	if (phoneticRepresentation) {
		lines.push(`Phonetic representation: ${phoneticRepresentation}`);
	}

	const senses = entry[ONTOLEX_SENSE] ?? [];
	const definitionLines = renderSenseDefinitions(
		senses,
		language,
		senseHeadwordMap,
	);
	if (definitionLines.length > 0) {
		lines.push(...definitionLines);
	} else {
		lines.push("No definition available.");
	}

	return lines.join("\n");
}

function renderSenseDefinitions(
	senses: LexicalSense[],
	language: LanguageTag,
	senseHeadwordMap: Map<URI, string>,
): string[] {
	const lines: string[] = [];
	let index = 0;

	for (const sense of senses) {
		const defText = selectLangValue(sense[SKOS_DEFINITION], language);
		if (!defText) {
			continue;
		}

		index += 1;
		lines.push(`${index}. ${defText}`);

		const seeAlso = collectSenseCrossReferences(sense, senseHeadwordMap);
		if (seeAlso.length > 0) {
			lines.push(`{see also: ${seeAlso.join(", ")}}`);
		}
	}

	return lines;
}

function collectSenseCrossReferences(
	sense: LexicalSense,
	senseHeadwordMap: Map<URI, string>,
): string[] {
	const refs = new Set<string>();
	for (const rel of sense[VARTRANS_SENSE_REL] ?? []) {
		const target = rel[VARTRANS_TARGET];
		if (!target) {
			continue;
		}
		const headword = senseHeadwordMap.get(target);
		if (headword) {
			refs.add(headword);
		}
	}
	return [...refs];
}

function selectHeadword(
	entry: LexicalEntry,
	language: LanguageTag,
): string | undefined {
	return selectLangValue(
		entry[ONTOLEX_CANONICAL_FORM][ONTOLEX_WRITTEN_REP],
		language,
	);
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

function normalizeHeadword(headword: string): string {
	return headword.replaceAll(/\s+/g, " ").trim();
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
