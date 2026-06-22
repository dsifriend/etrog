/**
 * LexInfo ontology enumeration constants.
 * Each value is the full LexInfo URI for the corresponding morphosyntactic feature.
 *
 * Reference: http://www.lexinfo.net/ontology/3.0/lexinfo
 */

const NS = "http://www.lexinfo.net/ontology/3.0/lexinfo#" as const;

/** Top-level part-of-speech categories. */
const LexInfoPoS_TopLevel = {
	noun: `${NS}noun`,
	verb: `${NS}verb`,
	adjective: `${NS}adjective`,
	adverb: `${NS}adverb`,
	pronoun: `${NS}pronoun`,
	preposition: `${NS}preposition`,
	conjunction: `${NS}conjunction`,
	determiner: `${NS}determiner`,
	interjection: `${NS}interjection`,
	particle: `${NS}particle`,
	numeral: `${NS}numeral`,
	symbol: `${NS}symbol`,
	/** Superclass of preposition, postposition, and circumposition. */
	adposition: `${NS}adposition`,
	/** Subtype of determiner; superclass of definite/indefinite/partitive article. */
	article: `${NS}article`,
} as const;

/** Noun subtypes. */
const LexInfoPoS_Nouns = {
	properNoun: `${NS}properNoun`,
	commonNoun: `${NS}commonNoun`,
	diminutiveNoun: `${NS}diminutiveNoun`,
	/** A noun that expresses a relational meaning (used in e.g. Basque and Navajo grammars). */
	relationNoun: `${NS}relationNoun`,
} as const;

/** Verb subtypes. */
const LexInfoPoS_Verbs = {
	auxiliary: `${NS}auxiliary`,
	copula: `${NS}copula`,
	modal: `${NS}modal`,
	mainVerb: `${NS}mainVerb`,
	/** A verb with little semantic content of its own (e.g. 'make' in 'make a decision'). */
	lightVerb: `${NS}lightVerb`,
	plainVerb: `${NS}plainVerb`,
	deficientVerb: `${NS}deficientVerb`,
} as const;

/** Adjective subtypes. */
const LexInfoPoS_Adjectives = {
	ordinalAdjective: `${NS}ordinalAdjective`,
	qualifierAdjective: `${NS}qualifierAdjective`,
	possessiveAdjective: `${NS}possessiveAdjective`,
	participleAdjective: `${NS}participleAdjective`,
	presentParticipleAdjective: `${NS}presentParticipleAdjective`,
	pastParticipleAdjective: `${NS}pastParticipleAdjective`,
	/** Japanese i-adjective: deverbal adjective ending in -i in dictionary form. */
	adjectiveI: `${NS}adjective-i`,
	/** Japanese na-adjective: denominal adjective formed from a noun with the particle 'na'. */
	adjectiveNa: `${NS}adjective-na`,
} as const;

/** Adverb subtypes. */
const LexInfoPoS_Adverbs = {
	generalAdverb: `${NS}generalAdverb`,
	pronominalAdverb: `${NS}pronominalAdverb`,
	prepositionalAdverb: `${NS}prepositionalAdverb`,
} as const;

/** Pronoun subtypes. */
const LexInfoPoS_Pronouns = {
	personalPronoun: `${NS}personalPronoun`,
	possessivePronoun: `${NS}possessivePronoun`,
	demonstrativePronoun: `${NS}demonstrativePronoun`,
	relativePronoun: `${NS}relativePronoun`,
	reflexivePersonalPronoun: `${NS}reflexivePersonalPronoun`,
	indefinitePronoun: `${NS}indefinitePronoun`,
	interrogativePronoun: `${NS}interrogativePronoun`,
	reciprocalPronoun: `${NS}reciprocalPronoun`,
	negativePronoun: `${NS}negativePronoun`,
	impersonalPronoun: `${NS}impersonalPronoun`,
	existentialPronoun: `${NS}existentialPronoun`,
	emphaticPronoun: `${NS}emphaticPronoun`,
	collectivePronoun: `${NS}collectivePronoun`,
	reflexivePossessivePronoun: `${NS}reflexivePossessivePronoun`,
	possessiveRelativePronoun: `${NS}possessiveRelativePronoun`,
	conditionalPronoun: `${NS}conditionalPronoun`,
	presentativePronoun: `${NS}presentativePronoun`,
	adverbialPronoun: `${NS}adverbialPronoun`,
	allusivePronoun: `${NS}allusivePronoun`,
	exclamativePronoun: `${NS}exclamativePronoun`,
	interrogativeRelativePronoun: `${NS}interrogativeRelativePronoun`,
	affixedPersonalPronoun: `${NS}affixedPersonalPronoun`,
	weakPersonalPronoun: `${NS}weakPersonalPronoun`,
	strongPersonalPronoun: `${NS}strongPersonalPronoun`,
	irreflexivePersonalPronoun: `${NS}irreflexivePersonalPronoun`,
	/** Irish: a word formed by fusing a pronoun with an auxiliary verb (e.g. 'táim' = 'tá' + 'mé'). */
	fusedPronounAuxiliary: `${NS}fusedPronounAuxiliary`,
} as const;

/** Determiner subtypes (including article subtypes). */
const LexInfoPoS_Determiners = {
	definiteArticle: `${NS}definiteArticle`,
	indefiniteArticle: `${NS}indefiniteArticle`,
	/** French: 'du', 'de la' — an article expressing a part or unspecified quantity. */
	partitiveArticle: `${NS}partitiveArticle`,
	demonstrativeDeterminer: `${NS}demonstrativeDeterminer`,
	possessiveDeterminer: `${NS}possessiveDeterminer`,
	indefiniteDeterminer: `${NS}indefiniteDeterminer`,
	interrogativeDeterminer: `${NS}interrogativeDeterminer`,
	reflexiveDeterminer: `${NS}reflexiveDeterminer`,
	relativeDeterminer: `${NS}relativeDeterminer`,
	exclamativeDeterminer: `${NS}exclamativeDeterminer`,
} as const;

/** Conjunction subtypes. */
const LexInfoPoS_Conjunctions = {
	coordinatingConjunction: `${NS}coordinatingConjunction`,
	subordinatingConjunction: `${NS}subordinatingConjunction`,
} as const;

/** Adposition subtypes. */
const LexInfoPoS_Adpositions = {
	/** Used in e.g. Japanese, Korean, Turkish, Finnish — follows the noun phrase. */
	postposition: `${NS}postposition`,
	/** Split adposition surrounding the noun phrase. */
	circumposition: `${NS}circumposition`,
	compoundPreposition: `${NS}compoundPreposition`,
	/** Morphological merge of preposition + article (e.g. French 'du', German 'im'). */
	fusedPreposition: `${NS}fusedPreposition`,
	/** Irish: preposition fused with a pronoun (e.g. 'agam' = 'ag' + 'mé'). */
	fusedPrepositionPronoun: `${NS}fusedPrepositionPronoun`,
	/** Preposition fused with a determiner. */
	fusedPrepositionDeterminer: `${NS}fusedPrepositionDeterminer`,
} as const;

/** Particle subtypes. */
const LexInfoPoS_Particles = {
	infinitiveParticle: `${NS}infinitiveParticle`,
	futureParticle: `${NS}futureParticle`,
	affirmativeParticle: `${NS}affirmativeParticle`,
	negativeParticle: `${NS}negativeParticle`,
	comparativeParticle: `${NS}comparativeParticle`,
	superlativeParticle: `${NS}superlativeParticle`,
	coordinationParticle: `${NS}coordinationParticle`,
	interrogativeParticle: `${NS}interrogativeParticle`,
	relativeParticle: `${NS}relativeParticle`,
	conditionalParticle: `${NS}conditionalParticle`,
	possessiveParticle: `${NS}possessiveParticle`,
	distinctiveParticle: `${NS}distinctiveParticle`,
	unclassifiedParticle: `${NS}unclassifiedParticle`,
} as const;

/** Numeral subtypes. */
const LexInfoPoS_Numerals = {
	cardinalNumeral: `${NS}cardinalNumeral`,
	multiplicativeNumeral: `${NS}multiplicativeNumeral`,
	numeralFraction: `${NS}numeralFraction`,
	genericNumeral: `${NS}genericNumeral`,
	indefiniteCardinalNumeral: `${NS}indefiniteCardinalNumeral`,
	indefiniteOrdinalNumeral: `${NS}indefiniteOrdinalNumeral`,
	indefiniteMultiplicativeNumeral: `${NS}indefiniteMultiplicativeNumeral`,
	interrogativeCardinalNumeral: `${NS}interrogativeCardinalNumeral`,
	interrogativeOrdinalNumeral: `${NS}interrogativeOrdinalNumeral`,
	interrogativeMultiplicativeNumeral: `${NS}interrogativeMultiplicativeNumeral`,
} as const;

/** Punctuation and symbol subtypes. */
const LexInfoPoS_Symbols = {
	punctuation: `${NS}punctuation`,
	comma: `${NS}comma`,
	colon: `${NS}colon`,
	semiColon: `${NS}semiColon`,
	slash: `${NS}slash`,
	bullet: `${NS}bullet`,
	suspensionPoints: `${NS}suspensionPoints`,
	questionMark: `${NS}questionMark`,
	exclamativePoint: `${NS}exclamativePoint`,
	openParenthesis: `${NS}openParenthesis`,
	closeParenthesis: `${NS}closeParenthesis`,
	invertedComma: `${NS}invertedComma`,
	point: `${NS}point`,
	letter: `${NS}letter`,
} as const;

/** Miscellaneous part-of-speech values. */
const LexInfoPoS_Misc = {
	/** A word that does not carry its own meaning but generalises a neighbouring word, adding an 'etc.' sense. */
	generalizationWord: `${NS}generalizationWord`,
} as const;

/**
 * Part-of-speech values from the LexInfo ontology v3.0.
 *
 * Covers all `PartOfSpeech` individuals defined in the ontology, grouped
 * into named sub-objects (LexInfoPoS_TopLevel, LexInfoPoS_Nouns, …) that
 * are spread-merged here. Callers reference values as `LexInfoPoS.noun`,
 * `LexInfoPoS.auxiliary`, etc. — the merge is transparent at call sites.
 */
export const LexInfoPoS = {
	...LexInfoPoS_TopLevel,
	...LexInfoPoS_Nouns,
	...LexInfoPoS_Verbs,
	...LexInfoPoS_Adjectives,
	...LexInfoPoS_Adverbs,
	...LexInfoPoS_Pronouns,
	...LexInfoPoS_Determiners,
	...LexInfoPoS_Conjunctions,
	...LexInfoPoS_Adpositions,
	...LexInfoPoS_Particles,
	...LexInfoPoS_Numerals,
	...LexInfoPoS_Symbols,
	...LexInfoPoS_Misc,
} as const;
export type LexInfoPoS = (typeof LexInfoPoS)[keyof typeof LexInfoPoS];

/**
 * Term-type values from the LexInfo ontology v3.0.
 *
 * `TermType` classifies the form or origin of a lexical entry rather than
 * its grammatical role. It is a distinct dimension from part-of-speech and
 * is set via the `lexinfo:termType` property.
 */
export const LexInfoTermType = {
	/** Abbreviated forms */
	/** Any abbreviated form (superclass of acronym, initialism, clippedTerm, contraction). */
	abbreviatedForm: `${NS}abbreviatedForm`,
	/** An abbreviation pronounced as a word (e.g. 'NATO', 'laser'). */
	acronym: `${NS}acronym`,
	/** An abbreviation pronounced letter-by-letter (e.g. 'FBI', 'HTML'). */
	initialism: `${NS}initialism`,
	/** A shortened form produced by truncating the full term (e.g. 'flu' from 'influenza'). */
	clippedTerm: `${NS}clippedTerm`,
	/** A generic abbreviated form. */
	abbreviation: `${NS}abbreviation`,
	/** A contraction formed by omitting sounds or letters (e.g. "don't"). */
	contraction: `${NS}contraction`,

	/** Multiword / phrasal forms */
	/** A lexical unit combining two or more words whose combined meaning is not compositional. */
	compound: `${NS}compound`,
	/** A fixed, lexicalised phrase whose meaning cannot be derived from its parts. */
	idiom: `${NS}idiom`,
	/** Any group of two or more words forming a fixed unit (broader than idiom). */
	phraseologicalUnit: `${NS}phraseologicalUnit`,
	/** A fixed, recurring chunk of text. */
	setPhrase: `${NS}setPhrase`,
	/** A brief popular saying or maxim. */
	proverb: `${NS}proverb`,

	/** Length variants */
	/** The complete, expanded form of a term for which an abbreviated form exists. */
	fullForm: `${NS}fullForm`,
	/** A variant of a multiword term that uses fewer words than the full form. */
	shortForm: `${NS}shortForm`,

	/** Scientific / technical forms */
	/** A term that is part of an international scientific nomenclature. */
	internationalScientificTerm: `${NS}internationalScientificTerm`,
	/** A term with the same or nearly identical form across many languages. */
	internationalism: `${NS}internationalism`,
	/** A synonym for an international scientific term used in general discourse. */
	commonName: `${NS}commonName`,
	/** A lexical unit in a CJKV language represented by two or more CJKV characters. */
	CJK_compound: `${NS}CJK_compound`,

	/** Formulaic expressions */
	/** Figures or symbols used to express a concept briefly (e.g. a chemical or mathematical formula). */
	formula: `${NS}formula`,
	/** An expression representing a concept via a mathematical equality or assignment. */
	equation: `${NS}equation`,
	/** An expression using mathematical or logical relations (inequalities, sets, Boolean operations). */
	logicalExpression: `${NS}logicalExpression`,

	/** Commercial identifiers */
	/** The official designator for a product. */
	productName: `${NS}productName`,
	/** A unique alphanumeric manufacturing part number. */
	partNumber: `${NS}partNumber`,
	/** A unique alphanumeric inventory item identifier (Stock Keeping Unit). */
	sku: `${NS}sku`,

	/** Miscellaneous */
	/** The term that heads a terminological entry. */
	entryTerm: `${NS}entryTerm`,
	/** A significant word or phrase. */
	expression: `${NS}expression`,
	/** The nucleus (head) of a multiword or multi-morphemic compound term. */
	nucleus: `${NS}nucleus`,
	/** A symbol or glyph representing an idea, concept, or object. */
	symbol: `${NS}symbol`,
	/** A chunk of text used in a software interface, documentation, or help file. */
	string: `${NS}string`,
	/** A type value assigned to a string. */
	stringCategory: `${NS}stringCategory`,
	/** A fixed chunk of recurring text. */
	standardText: `${NS}standardText`,
} as const;
export type LexInfoTermType =
	(typeof LexInfoTermType)[keyof typeof LexInfoTermType];

/** Grammatical gender values from the LexInfo ontology. */
export const LexInfoGender = {
	masculine: `${NS}masculine`,
	feminine: `${NS}feminine`,
	neuter: `${NS}neuter`,
	common: `${NS}commonGender`,
	/** Catch-all for gender values not covered by the enumerated individuals. */
	otherGender: `${NS}otherGender`,
} as const;
export type LexInfoGender = (typeof LexInfoGender)[keyof typeof LexInfoGender];

/** Grammatical number values from the LexInfo ontology. */
export const LexInfoNumber = {
	singular: `${NS}singular`,
	plural: `${NS}plural`,
	dual: `${NS}dual`,
	/** Number for a group treated as a single entity. */
	collective: `${NS}collective`,
	/** Uncountable / mass noun number. */
	massNoun: `${NS}massNoun`,
	/** Small-number plural (three to a handful, used in some languages). */
	paucal: `${NS}paucal`,
	/** Number for exactly four referents (rare, e.g. Sursurunga). */
	quadrial: `${NS}quadrial`,
	/** Number for exactly three referents. */
	trial: `${NS}trial`,
	/** Catch-all for number values not covered by the enumerated individuals. */
	otherNumber: `${NS}otherNumber`,
} as const;
export type LexInfoNumber = (typeof LexInfoNumber)[keyof typeof LexInfoNumber];

/** Grammatical tense values from the LexInfo ontology. */
export const LexInfoTense = {
	present: `${NS}presentTense`,
	past: `${NS}pastTense`,
	future: `${NS}futureTense`,
	/** Past tense indicating an ongoing or incomplete action (Latin, Spanish, etc.). */
	imperfect: `${NS}imperfect`,
	/** Simple past / preterite (completed action in the past). */
	preterite: `${NS}preterite`,
} as const;
export type LexInfoTense = (typeof LexInfoTense)[keyof typeof LexInfoTense];

/** Grammatical mood values from the LexInfo ontology. */
export const LexInfoMood = {
	indicative: `${NS}indicativeMood`,
	subjunctive: `${NS}subjunctiveMood`,
	imperative: `${NS}imperativeMood`,
	conditional: `${NS}conditionalMood`,
	optative: `${NS}optativeMood`,
} as const;
export type LexInfoMood = (typeof LexInfoMood)[keyof typeof LexInfoMood];

/** Grammatical voice values from the LexInfo ontology. */
export const LexInfoVoice = {
	active: `${NS}activeVoice`,
	passive: `${NS}passiveVoice`,
	middle: `${NS}middleVoice`,
} as const;
export type LexInfoVoice = (typeof LexInfoVoice)[keyof typeof LexInfoVoice];

/** Grammatical person values from the LexInfo ontology. */
export const LexInfoPerson = {
	first: `${NS}firstPerson`,
	second: `${NS}secondPerson`,
	third: `${NS}thirdPerson`,
} as const;
export type LexInfoPerson = (typeof LexInfoPerson)[keyof typeof LexInfoPerson];

/** Grammatical case values from the LexInfo ontology (all 30 case individuals). */
export const LexInfoCase = {
	/** Core cases */
	nominative: `${NS}nominativeCase`,
	accusative: `${NS}accusativeCase`,
	genitive: `${NS}genitiveCase`,
	dative: `${NS}dativeCase`,
	ablative: `${NS}ablativeCase`,
	instrumental: `${NS}instrumentalCase`,
	locative: `${NS}locativeCase`,
	vocative: `${NS}vocativeCase`,

	/** Extended cases */
	/** "Without X" — Finnish, Estonian. */
	abessive: `${NS}abessiveCase`,
	/** Ergative-absolutive languages (Basque, etc.) — marks intransitive subject / transitive object. */
	absolutive: `${NS}absolutiveCase`,
	/** "At/on X" — Finnish superlocal static case. */
	adessive: `${NS}adessiveCase`,
	/** "Towards X" — directional case. */
	aditive: `${NS}aditiveCase`,
	/** "To X" — Finnish illative-like directional case. */
	allative: `${NS}allativeCase`,
	/** "For the benefit of X" — benefactive semantic role. */
	benefactive: `${NS}benefactiveCase`,
	/** Causal relation — "because of X". */
	causative: `${NS}causativeCase`,
	/** "Together with X" — comitative/associative case. */
	comitative: `${NS}comitativeCase`,
	/** "From off X" — Hungarian delative (surface separation). */
	delative: `${NS}delativeCase`,
	/** Unmarked or default case in some nominative-accusative languages. */
	direct: `${NS}directCase`,
	/** "Out of X" — Finnish elative (interior separation). */
	elative: `${NS}elativeCase`,
	/** "Like X, as X" — equative/comparative case. */
	equative: `${NS}equativeCase`,
	/** Marks transitive subject in ergative-absolutive languages. */
	ergative: `${NS}ergativeCase`,
	/** "As X" (temporary state) — Finnish essive. */
	essive: `${NS}essiveCase`,
	/** "Into X" — Finnish illative (interior approach). */
	illative: `${NS}illativeCase`,
	/** "In/inside X" — Finnish inessive (interior static). */
	inessive: `${NS}inessiveCase`,
	/** Motion towards — general lative. */
	lative: `${NS}lativeCase`,
	/** Non-nominative oblique case (Hindi-Urdu, etc.). */
	oblique: `${NS}obliqueCase`,
	/** Partial quantity — Finnish partitive. */
	partitive: `${NS}partitiveCase`,
	/** "Via/through X" — prolative/vialis case. */
	prolative: `${NS}prolativeCase`,
	/** "In company with X" — sociative case. */
	sociative: `${NS}sociativeCase`,
	/** "Onto X" — Hungarian sublative (surface approach). */
	sublative: `${NS}sublativeCase`,
	/** "On top of X" — Hungarian superessive (surface static). */
	superessive: `${NS}superessiveCase`,
	/** "Up to X" — Estonian terminative. */
	terminative: `${NS}terminativeCase`,
	/** "Becoming X" — Finnish translative (change of state). */
	translative: `${NS}translativeCase`,
} as const;
export type LexInfoCase = (typeof LexInfoCase)[keyof typeof LexInfoCase];

/** Grammatical degree of comparison values from the LexInfo ontology. */
export const LexInfoDegree = {
	positive: `${NS}positiveDegree`,
	comparative: `${NS}comparativeDegree`,
	superlative: `${NS}superlativeDegree`,
} as const;
export type LexInfoDegree = (typeof LexInfoDegree)[keyof typeof LexInfoDegree];

/** Grammatical aspect values from the LexInfo ontology. */
export const LexInfoAspect = {
	perfective: `${NS}perfectiveAspect`,
	imperfective: `${NS}imperfectiveAspect`,
	progressive: `${NS}progressiveAspect`,
	/** Aspect indicating the cessation of an action. */
	cessative: `${NS}cessativeAspect`,
	/** Aspect indicating the beginning of a state or action. */
	inchoative: `${NS}inchoativeAspect`,
	/** Aspect indicating an action that is begun but not completed. */
	unaccomplished: `${NS}unaccomplishedAspect`,
} as const;
export type LexInfoAspect = (typeof LexInfoAspect)[keyof typeof LexInfoAspect];

/** Definiteness values from the LexInfo ontology. */
export const LexInfoDefiniteness = {
	definite: `${NS}definiteness-definite`,
	indefinite: `${NS}definiteness-indefinite`,
	/** Definite article realized in full form. */
	fullArticle: `${NS}fullArticle`,
	/** Definite article realized in reduced/short form (e.g. enclitic). */
	shortArticle: `${NS}shortArticle`,
} as const;
export type LexInfoDefiniteness =
	(typeof LexInfoDefiniteness)[keyof typeof LexInfoDefiniteness];

/**
 * Usage register values from the LexInfo ontology.
 *
 * `lexinfo:register` classifies the sociolinguistic or stylistic level of a
 * lexical item (e.g. formal, slang, vulgar).
 */
export const LexInfoRegister = {
	register: `${NS}register`,
	neutralRegister: `${NS}neutralRegister`,
	formalRegister: `${NS}formalRegister`,
	slangRegister: `${NS}slangRegister`,
	vulgarRegister: `${NS}vulgarRegister`,
	tabooRegister: `${NS}tabooRegister`,
	technicalRegister: `${NS}technicalRegister`,
	dialectRegister: `${NS}dialectRegister`,
	facetiousRegister: `${NS}facetiousRegister`,
	inHouseRegister: `${NS}inHouseRegister`,
	benchLevelRegister: `${NS}benchLevelRegister`,
	ironicRegister: `${NS}ironicRegister`,
} as const;
export type LexInfoRegister =
	(typeof LexInfoRegister)[keyof typeof LexInfoRegister];

/**
 * Verb-form mood values from the LexInfo ontology (`lexinfo:VerbFormMood`).
 *
 * Distinct from `LexInfoMood` (which covers inflected mood features);
 * `VerbFormMood` classifies the non-finite or quasi-finite form of a verb.
 *
 * @example
 * ```ts
 * import { LexInfoVerbFormMood } from "@etrog/core";
 * builder.set("lexinfo:verbFormMood", LexInfoVerbFormMood.infinitive);
 * ```
 */
export const LexInfoVerbFormMood = {
	conditional: `${NS}conditional`,
	/** A non-finite verb form functioning as a verbal adjective (e.g. 'written', 'running'). */
	gerundive: `${NS}gerundive`,
	imperative: `${NS}imperative`,
	indicative: `${NS}indicative`,
	/** The base, non-finite verb form (e.g. 'to run'). */
	infinitive: `${NS}infinitive`,
	/** A non-finite verb form used as a verbal adjective or noun. */
	participle: `${NS}participle`,
	subjunctive: `${NS}subjunctive`,
} as const;
export type LexInfoVerbFormMood =
	(typeof LexInfoVerbFormMood)[keyof typeof LexInfoVerbFormMood];

/**
 * Animacy values from the LexInfo ontology (`lexinfo:Animacy`).
 *
 * @example
 * ```ts
 * import { LexInfoAnimacy } from "@etrog/core";
 * builder.set("lexinfo:animacy", LexInfoAnimacy.animate);
 * ```
 */
export const LexInfoAnimacy = {
	/** Refers to living entities. */
	animate: `${NS}animate`,
	/** Refers to non-living entities. */
	inanimate: `${NS}inanimate`,
	/** Catch-all for animacy values not covered by the enumerated individuals. */
	otherAnimacy: `${NS}otherAnimacy`,
} as const;
export type LexInfoAnimacy =
	(typeof LexInfoAnimacy)[keyof typeof LexInfoAnimacy];

/**
 * Cliticness values from the LexInfo ontology (`lexinfo:Cliticness`).
 *
 * @example
 * ```ts
 * import { LexInfoCliticness } from "@etrog/core";
 * builder.set("lexinfo:cliticness", LexInfoCliticness.bound);
 * ```
 */
export const LexInfoCliticness = {
	/** The form is a bound clitic (must attach to a host). */
	bound: `${NS}bound`,
	/** The form is not a clitic. */
	no: `${NS}cliticness-no`,
	/** The form is a clitic. */
	yes: `${NS}cliticness-yes`,
} as const;
export type LexInfoCliticness =
	(typeof LexInfoCliticness)[keyof typeof LexInfoCliticness];

/**
 * Finiteness values from the LexInfo ontology (`lexinfo:Finiteness`).
 *
 * @example
 * ```ts
 * import { LexInfoFiniteness } from "@etrog/core";
 * builder.set("lexinfo:finiteness", LexInfoFiniteness.finite);
 * ```
 */
export const LexInfoFiniteness = {
	/** The verb form is finite (marked for tense, agreement, mood). */
	finite: `${NS}finite`,
	/** The verb form is non-finite (infinitive, participle, gerund, etc.). */
	nonFinite: `${NS}nonFinite`,
} as const;
export type LexInfoFiniteness =
	(typeof LexInfoFiniteness)[keyof typeof LexInfoFiniteness];

/**
 * Negative values from the LexInfo ontology (`lexinfo:Negative`).
 *
 * @example
 * ```ts
 * import { LexInfoNegative } from "@etrog/core";
 * builder.set("lexinfo:negative", LexInfoNegative.yes);
 * ```
 */
export const LexInfoNegative = {
	/** The form carries negative polarity. */
	yes: `${NS}negative-yes`,
	/** The form does not carry negative polarity. */
	no: `${NS}negative-no`,
} as const;
export type LexInfoNegative =
	(typeof LexInfoNegative)[keyof typeof LexInfoNegative];

/**
 * Normative authorization values from the LexInfo ontology
 * (`lexinfo:normativeAuthorization`).
 *
 * Classifies the normative standing of a term according to terminological
 * standards (ISO 704, ISO 1087, etc.).
 *
 * @example
 * ```ts
 * import { LexInfoNormativeAuthorization } from "@etrog/core";
 * builder.set("lexinfo:normativeAuthorization", LexInfoNormativeAuthorization.preferredTerm);
 * ```
 */
export const LexInfoNormativeAuthorization = {
	/** Synonym acceptable for a preferred term. */
	admittedTerm: `${NS}admittedTerm`,
	/** Term rated as undesired; use should be discouraged. */
	deprecatedTerm: `${NS}deprecatedTerm`,
	/** Legally defined term. */
	legalTerm: `${NS}legalTerm`,
	/** Primary term chosen to represent a concept. */
	preferredTerm: `${NS}preferredTerm`,
	/** Term defined or constrained by law or regulation. */
	regulatedTerm: `${NS}regulatedTerm`,
	/** Term standardized by a recognized standards body. */
	standardizedTerm: `${NS}standardizedTerm`,
	/** Term that is no longer preferred or admitted. */
	supersededTerm: `${NS}supersededTerm`,
} as const;
export type LexInfoNormativeAuthorization =
	(typeof LexInfoNormativeAuthorization)[keyof typeof LexInfoNormativeAuthorization];

/**
 * Temporal usage qualifier values from the LexInfo ontology
 * (`lexinfo:dating`).
 *
 * Marks whether a lexical form is considered archaic, obsolete, or merely
 * outdated in contemporary use.
 *
 * @example
 * ```ts
 * import { LexInfoDating } from "@etrog/core";
 * builder.set("lexinfo:dating", LexInfoDating.archaicForm);
 * ```
 */
export const LexInfoDating = {
	/** No longer in ordinary use but retained for historical or stylistic effect. */
	archaicForm: `${NS}archaicForm`,
	/** No longer in common use. */
	obsoleteForm: `${NS}obsoleteForm`,
	/** Fallen from fashion but still recognizable to speakers. */
	outdatedForm: `${NS}outdatedForm`,
} as const;
export type LexInfoDating = (typeof LexInfoDating)[keyof typeof LexInfoDating];

/**
 * Frequency values from the LexInfo ontology (`lexinfo:frequency`).
 *
 * @example
 * ```ts
 * import { LexInfoFrequency } from "@etrog/core";
 * builder.set("lexinfo:frequency", LexInfoFrequency.commonlyUsed);
 * ```
 */
export const LexInfoFrequency = {
	/** The term appears frequently in the relevant corpus or language. */
	commonlyUsed: `${NS}commonlyUsed`,
	/** The term does not appear frequently. */
	infrequentlyUsed: `${NS}infrequentlyUsed`,
	/** The term is almost never encountered. */
	rarelyUsed: `${NS}rarelyUsed`,
} as const;
export type LexInfoFrequency =
	(typeof LexInfoFrequency)[keyof typeof LexInfoFrequency];

/**
 * Sense-level lexical relation property URIs from the LexInfo ontology.
 *
 * These are object properties whose domain and range are
 * `ontolex:LexicalSense`. Use the value as the JSON-LD property key when
 * linking two sense nodes.
 *
 * @example
 * ```ts
 * import { LexInfoSenseRelation } from "@etrog/core";
 * senseBuilder.set(LexInfoSenseRelation.antonym, otherSenseId);
 * ```
 */
export const LexInfoSenseRelation = {
	/** Opposite meaning. */
	antonym: `${NS}antonym`,
	/** Same (or near-same) meaning — symmetric. */
	synonym: `${NS}synonym`,
	/** Narrower meaning (hyponym ← hypernym). */
	hyponym: `${NS}hyponym`,
	/** Similar but not exactly the same — symmetric. */
	approximate: `${NS}approximate`,
	/** Synonym with minor semantic differences — symmetric. */
	approximateSynonym: `${NS}approximateSynonym`,
	/** Non-hierarchical thematic connection — symmetric. */
	associativeRelation: `${NS}associativeRelation`,
	/** Causative relationship between concepts. */
	causallyRelatedConcept: `${NS}causallyRelatedConcept`,
	/** Frequently co-occurring terms (collocate). */
	collocation: `${NS}collocation`,
	/** Share the same superordinate and subdivision criterion. */
	coordinateConcept: `${NS}coordinateConcept`,
	/** Completely equal in every detail — symmetric. */
	exact: `${NS}exact`,
	/** Element-of relationship (meronymy by membership). */
	memberMeronym: `${NS}memberMeronym`,
	/** Part-of relationship (meronymy by part). */
	meronymTerm: `${NS}meronymTerm`,
	/** Component-of relationship. */
	partMeronym: `${NS}partMeronym`,
	/** Whole-part relationship (holonymy). */
	partitiveRelation: `${NS}partitiveRelation`,
	/** Adjectival form meaning "of or pertaining to" the related concept. */
	pertainsTo: `${NS}pertainsTo`,
	/** Very similar with some differences (near-synonym). */
	quasiEquivalent: `${NS}quasiEquivalent`,
	/** "Composed of" relationship (substance holonymy). */
	substanceHolonym: `${NS}substanceHolonym`,
	/** Interlingual synonymy — translation equivalent. */
	translation: `${NS}translation`,
} as const;
export type LexInfoSenseRelation =
	(typeof LexInfoSenseRelation)[keyof typeof LexInfoSenseRelation];

/**
 * Entry-level lexical relation property URIs from the LexInfo ontology.
 *
 * These are object properties whose domain and range are
 * `ontolex:LexicalEntry`. Use the value as the JSON-LD property key when
 * linking two entry nodes.
 *
 * @example
 * ```ts
 * import { LexInfoEntryRelation } from "@etrog/core";
 * entryBuilder.set(LexInfoEntryRelation.abbreviationFor, fullFormEntryId);
 * ```
 */
export const LexInfoEntryRelation = {
	/** Links an abbreviated form to its expanded lexical entry. */
	abbreviationFor: `${NS}abbreviationFor`,
	/** Links an acronym to its expanded lexical entry. */
	acronymFor: `${NS}acronymFor`,
	/** Links a clipped/truncated term to its full form entry. */
	clippedTermFor: `${NS}clippedTermFor`,
	/** The morpheme or root with etymological significance. */
	etymologicalRoot: `${NS}etymologicalRoot`,
	/** Inverse of abbreviation/acronym/initialism relations. */
	fullFormFor: `${NS}fullFormFor`,
	/** Regional or dialectal variant of a lexical entry. */
	geographicalVariant: `${NS}geographicalVariant`,
	/** Same spelling but different meaning or origin. */
	homograph: `${NS}homograph`,
	/** Same pronunciation — covers both homographs and homophones. */
	homonym: `${NS}homonym`,
	/** Same pronunciation but different spelling. */
	homophone: `${NS}homophone`,
	/** Links an initialism to its expanded lexical entry. */
	initialismFor: `${NS}initialismFor`,
	/** Links a participle form to the verb it is derived from. */
	participlFormOf: `${NS}participleFormOf`,
	/** The base or root of a word. */
	root: `${NS}root`,
	/** Links a short form to its full lexical entry. */
	shortFormFor: `${NS}shortFormFor`,
} as const;
export type LexInfoEntryRelation =
	(typeof LexInfoEntryRelation)[keyof typeof LexInfoEntryRelation];

/**
 * Syntactic frame class URIs from the LexInfo ontology.
 *
 * Use as the value of `@type` on a `synsem:SyntacticFrame` node. LexInfo
 * defines 80+ frame classes; this enum covers the high- and medium-priority
 * ones identified for Etrog.
 *
 * @example
 * ```ts
 * import { LexInfoFrame } from "@etrog/core";
 * frameBuilder.setType(LexInfoFrame.TransitiveFrame);
 * ```
 */
export const LexInfoFrame = {
	/** Basic intransitive verb frame (e.g. "he left"). */
	IntransitiveFrame: `${NS}IntransitiveFrame`,
	/** Transitive verb frame — takes a direct object (e.g. "the dog bit the man"). */
	TransitiveFrame: `${NS}TransitiveFrame`,
	/** Ditransitive verb frame — takes two objects (e.g. "I gave him it"). */
	DitransitiveFrame: `${NS}DitransitiveFrame`,
	/** Base noun frame. */
	NounFrame: `${NS}NounFrame`,
	/** Base adjective frame. */
	AdjectiveFrame: `${NS}AdjectiveFrame`,

	/** Attributive adjective use (e.g. "the red ball"). */
	AdjectiveAttributiveFrame: `${NS}AdjectiveAttributiveFrame`,
	/** Predicative adjective use (e.g. "he is happy"). */
	AdjectivePredicativeFrame: `${NS}AdjectivePredicativeFrame`,
	/** Intransitive verb + prepositional phrase (e.g. "he took care of her"). */
	IntransitivePPFrame: `${NS}IntransitivePPFrame`,
	/** Transitive verb + prepositional phrase (e.g. "she added salt to the stew"). */
	TransitivePPFrame: `${NS}TransitivePPFrame`,
	/** Reflexive verb frame. */
	ReflexiveFrame: `${NS}ReflexiveFrame`,
	/** Impersonal construction frame (no canonical subject). */
	ImpersonalFrame: `${NS}ImpersonalFrame`,
} as const;
export type LexInfoFrame = (typeof LexInfoFrame)[keyof typeof LexInfoFrame];

/**
 * Form-level property URIs from the LexInfo ontology.
 *
 * These object properties link an `ontolex:Form` node to inflectional
 * feature values. Use the keys as JSON-LD property names on a form object.
 *
 * @example
 * ```ts
 * import { LexInfoFormProperty } from "@etrog/core";
 * formBuilder.set(LexInfoFormProperty.nominativeCaseForm, formId);
 * ```
 */
export const LexInfoFormProperty = {
	/** Case form variants (30 case-specific form properties) */
	nominativeCaseForm: `${NS}nominativeCaseForm`,
	accusativeCaseForm: `${NS}accusativeCaseForm`,
	genitiveCaseForm: `${NS}genitiveCaseForm`,
	dativeCaseForm: `${NS}dativeCaseForm`,
	ablativeCaseForm: `${NS}ablativeCaseForm`,
	instrumentalCaseForm: `${NS}instrumentalCaseForm`,
	locativeCaseForm: `${NS}locativeCaseForm`,
	vocativeCaseForm: `${NS}vocativeCaseForm`,
	abessiveCaseForm: `${NS}abessiveCaseForm`,
	absolutiveCaseForm: `${NS}absolutiveCaseForm`,
	adessiveCaseForm: `${NS}adessiveCaseForm`,
	aditiveCaseForm: `${NS}aditiveCaseForm`,
	allativeCaseForm: `${NS}allativeCaseForm`,
	benefactiveCaseForm: `${NS}benefactiveCaseForm`,
	causativeCaseForm: `${NS}causativeCaseForm`,
	comitativeCaseForm: `${NS}comitativeCaseForm`,
	delativeCaseForm: `${NS}delativeCaseForm`,
	directCaseForm: `${NS}directCaseForm`,
	elativeCaseForm: `${NS}elativeCaseForm`,
	equativeCaseForm: `${NS}equativeCaseForm`,
	ergativeCaseForm: `${NS}ergativeCaseForm`,
	essiveCaseForm: `${NS}essiveCaseForm`,
	illativeCaseForm: `${NS}illativeCaseForm`,
	inessiveCaseForm: `${NS}inessiveCaseForm`,
	lativeCaseForm: `${NS}lativeCaseForm`,
	obliqueCaseForm: `${NS}obliqueCaseForm`,
	partitiveCaseForm: `${NS}partitiveCaseForm`,
	prolativeCaseForm: `${NS}prolativeCaseForm`,
	sociativeCaseForm: `${NS}sociativeCaseForm`,
	sublativeCaseForm: `${NS}sublativeCaseForm`,
	superessiveCaseForm: `${NS}superessiveCaseForm`,
	terminativeCaseForm: `${NS}terminativeCaseForm`,
	translativeCaseForm: `${NS}translativeCaseForm`,
	/** Number form variants */
	singularNumberForm: `${NS}singularNumberForm`,
	pluralNumberForm: `${NS}pluralNumberForm`,
	dualNumberForm: `${NS}dualNumberForm`,
	collectiveNumberForm: `${NS}collectiveNumberForm`,
	paucalNumberForm: `${NS}paucalNumberForm`,
	quadrialNumberForm: `${NS}quadrialNumberForm`,
	trialNumberForm: `${NS}trialNumberForm`,
	massNounNumberForm: `${NS}massNounNumberForm`,
	/** Tense form variants */
	presentTenseForm: `${NS}presentTenseForm`,
	pastTenseForm: `${NS}pastTenseForm`,
	futureTenseForm: `${NS}futureTenseForm`,
	imperfectTenseForm: `${NS}imperfectTenseForm`,
	preteriteTenseForm: `${NS}preteriteTenseForm`,
	/** Mood form variants */
	indicativeMoodForm: `${NS}indicativeMoodForm`,
	subjunctiveMoodForm: `${NS}subjunctiveMoodForm`,
	imperativeMoodForm: `${NS}imperativeMoodForm`,
	/** Degree form variants */
	positiveDegreeForm: `${NS}positiveDegreeForm`,
	comparativeDegreeForm: `${NS}comparativeDegreeForm`,
	superlativeDegreeForm: `${NS}superlativeDegreeForm`,
	/** Person form variants */
	firstPersonForm: `${NS}firstPersonForm`,
	secondPersonForm: `${NS}secondPersonForm`,
	thirdPersonForm: `${NS}thirdPersonForm`,
} as const;
export type LexInfoFormProperty =
	(typeof LexInfoFormProperty)[keyof typeof LexInfoFormProperty];

/**
 * Term element values from the LexInfo ontology (`lexinfo:termElement`).
 *
 * Classifies the morphological role of a sub-word element within a lexical
 * entry (e.g. whether it is a prefix, suffix, or radical).
 *
 * @example
 * ```ts
 * import { LexInfoTermElement } from "@etrog/core";
 * elementBuilder.set("lexinfo:termElement", LexInfoTermElement.prefix);
 * ```
 */
export const LexInfoTermElement = {
	/** Generic affix — superclass of prefix, infix, and suffix. */
	affix: `${NS}affix`,
	/** Root or dictionary form of the word. */
	baseElement: `${NS}baseElement`,
	/** Morpheme inserted within a word stem. */
	infix: `${NS}infix`,
	/** Morpheme encoding inflectional information (declension/conjugation). */
	inflectionElement: `${NS}inflectionElement`,
	/** Smallest meaningful morphological unit. */
	morphologicalElement: `${NS}morphologicalElement`,
	/** Optional part of a compound headword. */
	optionalElement: `${NS}optionalElement`,
	/** Word-initial morpheme. */
	prefix: `${NS}prefix`,
	/** CJKV character component (radical). */
	radical: `${NS}radical`,
	/** Word-final morpheme. */
	suffix: `${NS}suffix`,
	/** Phonological unit within a word. */
	syllable: `${NS}syllable`,
	/** Lexeme element that is itself a free morpheme / word. */
	wordElement: `${NS}wordElement`,
} as const;
export type LexInfoTermElement =
	(typeof LexInfoTermElement)[keyof typeof LexInfoTermElement];
