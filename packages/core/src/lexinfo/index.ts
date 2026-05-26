/**
 * LexInfo ontology enumeration constants.
 * Each value is the full LexInfo URI for the corresponding morphosyntactic feature.
 *
 * Reference: http://www.lexinfo.net/ontology/3.0/lexinfo
 */

// ─────────────────────────────────────────────────────────────────────────────
// Part of speech — broken into named groups and merged into LexInfoPoS so
// that the full union type remains a single flat const while each category
// stays readable for maintainers.
// ─────────────────────────────────────────────────────────────────────────────

const NS = "http://www.lexinfo.net/ontology/3.0/lexinfo#" as const;

/** Top-level part-of-speech categories. */
const LexInfoPoS_TopLevel = {
  noun:        `${NS}noun`,
  verb:        `${NS}verb`,
  adjective:   `${NS}adjective`,
  adverb:      `${NS}adverb`,
  pronoun:     `${NS}pronoun`,
  preposition: `${NS}preposition`,
  conjunction: `${NS}conjunction`,
  determiner:  `${NS}determiner`,
  interjection:`${NS}interjection`,
  particle:    `${NS}particle`,
  numeral:     `${NS}numeral`,
  symbol:      `${NS}symbol`,
  /** Superclass of preposition, postposition, and circumposition. */
  adposition:  `${NS}adposition`,
  /** Subtype of determiner; superclass of definite/indefinite/partitive article. */
  article:     `${NS}article`,
} as const;

/** Noun subtypes. */
const LexInfoPoS_Nouns = {
  properNoun:     `${NS}properNoun`,
  commonNoun:     `${NS}commonNoun`,
  diminutiveNoun: `${NS}diminutiveNoun`,
  /** A noun that expresses a relational meaning (used in e.g. Basque and Navajo grammars). */
  relationNoun:   `${NS}relationNoun`,
} as const;

/** Verb subtypes. */
const LexInfoPoS_Verbs = {
  auxiliary:    `${NS}auxiliary`,
  copula:       `${NS}copula`,
  modal:        `${NS}modal`,
  mainVerb:     `${NS}mainVerb`,
  /** A verb with little semantic content of its own (e.g. 'make' in 'make a decision'). */
  lightVerb:    `${NS}lightVerb`,
  plainVerb:    `${NS}plainVerb`,
  deficientVerb:`${NS}deficientVerb`,
} as const;

/** Adjective subtypes. */
const LexInfoPoS_Adjectives = {
  ordinalAdjective:           `${NS}ordinalAdjective`,
  qualifierAdjective:         `${NS}qualifierAdjective`,
  possessiveAdjective:        `${NS}possessiveAdjective`,
  participleAdjective:        `${NS}participleAdjective`,
  presentParticipleAdjective: `${NS}presentParticipleAdjective`,
  pastParticipleAdjective:    `${NS}pastParticipleAdjective`,
  /** Japanese i-adjective: deverbal adjective ending in -i in dictionary form. */
  adjectiveI:  `${NS}adjective-i`,
  /** Japanese na-adjective: denominal adjective formed from a noun with the particle 'na'. */
  adjectiveNa: `${NS}adjective-na`,
} as const;

/** Adverb subtypes. */
const LexInfoPoS_Adverbs = {
  generalAdverb:       `${NS}generalAdverb`,
  pronominalAdverb:    `${NS}pronominalAdverb`,
  prepositionalAdverb: `${NS}prepositionalAdverb`,
} as const;

/** Pronoun subtypes. */
const LexInfoPoS_Pronouns = {
  personalPronoun:             `${NS}personalPronoun`,
  possessivePronoun:           `${NS}possessivePronoun`,
  demonstrativePronoun:        `${NS}demonstrativePronoun`,
  relativePronoun:             `${NS}relativePronoun`,
  reflexivePersonalPronoun:    `${NS}reflexivePersonalPronoun`,
  indefinitePronoun:           `${NS}indefinitePronoun`,
  interrogativePronoun:        `${NS}interrogativePronoun`,
  reciprocalPronoun:           `${NS}reciprocalPronoun`,
  negativePronoun:             `${NS}negativePronoun`,
  impersonalPronoun:           `${NS}impersonalPronoun`,
  existentialPronoun:          `${NS}existentialPronoun`,
  emphaticPronoun:             `${NS}emphaticPronoun`,
  collectivePronoun:           `${NS}collectivePronoun`,
  reflexivePossessivePronoun:  `${NS}reflexivePossessivePronoun`,
  possessiveRelativePronoun:   `${NS}possessiveRelativePronoun`,
  conditionalPronoun:          `${NS}conditionalPronoun`,
  presentativePronoun:         `${NS}presentativePronoun`,
  adverbialPronoun:            `${NS}adverbialPronoun`,
  allusivePronoun:             `${NS}allusivePronoun`,
  exclamativePronoun:          `${NS}exclamativePronoun`,
  interrogativeRelativePronoun:`${NS}interrogativeRelativePronoun`,
  affixedPersonalPronoun:      `${NS}affixedPersonalPronoun`,
  weakPersonalPronoun:         `${NS}weakPersonalPronoun`,
  strongPersonalPronoun:       `${NS}strongPersonalPronoun`,
  irreflexivePersonalPronoun:  `${NS}irreflexivePersonalPronoun`,
  /** Irish: a word formed by fusing a pronoun with an auxiliary verb (e.g. 'táim' = 'tá' + 'mé'). */
  fusedPronounAuxiliary:       `${NS}fusedPronounAuxiliary`,
} as const;

/** Determiner subtypes (including article subtypes). */
const LexInfoPoS_Determiners = {
  definiteArticle:         `${NS}definiteArticle`,
  indefiniteArticle:       `${NS}indefiniteArticle`,
  /** French: 'du', 'de la' — an article expressing a part or unspecified quantity. */
  partitiveArticle:        `${NS}partitiveArticle`,
  demonstrativeDeterminer: `${NS}demonstrativeDeterminer`,
  possessiveDeterminer:    `${NS}possessiveDeterminer`,
  indefiniteDeterminer:    `${NS}indefiniteDeterminer`,
  interrogativeDeterminer: `${NS}interrogativeDeterminer`,
  reflexiveDeterminer:     `${NS}reflexiveDeterminer`,
  relativeDeterminer:      `${NS}relativeDeterminer`,
  exclamativeDeterminer:   `${NS}exclamativeDeterminer`,
} as const;

/** Conjunction subtypes. */
const LexInfoPoS_Conjunctions = {
  coordinatingConjunction:  `${NS}coordinatingConjunction`,
  subordinatingConjunction: `${NS}subordinatingConjunction`,
} as const;

/** Adposition subtypes. */
const LexInfoPoS_Adpositions = {
  /** Used in e.g. Japanese, Korean, Turkish, Finnish — follows the noun phrase. */
  postposition:              `${NS}postposition`,
  /** Split adposition surrounding the noun phrase. */
  circumposition:            `${NS}circumposition`,
  compoundPreposition:       `${NS}compoundPreposition`,
  /** Morphological merge of preposition + article (e.g. French 'du', German 'im'). */
  fusedPreposition:          `${NS}fusedPreposition`,
  /** Irish: preposition fused with a pronoun (e.g. 'agam' = 'ag' + 'mé'). */
  fusedPrepositionPronoun:   `${NS}fusedPrepositionPronoun`,
  /** Preposition fused with a determiner. */
  fusedPrepositionDeterminer:`${NS}fusedPrepositionDeterminer`,
} as const;

/** Particle subtypes. */
const LexInfoPoS_Particles = {
  infinitiveParticle:  `${NS}infinitiveParticle`,
  futureParticle:      `${NS}futureParticle`,
  affirmativeParticle: `${NS}affirmativeParticle`,
  negativeParticle:    `${NS}negativeParticle`,
  comparativeParticle: `${NS}comparativeParticle`,
  superlativeParticle: `${NS}superlativeParticle`,
  coordinationParticle:`${NS}coordinationParticle`,
  interrogativeParticle:`${NS}interrogativeParticle`,
  relativeParticle:    `${NS}relativeParticle`,
  conditionalParticle: `${NS}conditionalParticle`,
  possessiveParticle:  `${NS}possessiveParticle`,
  distinctiveParticle: `${NS}distinctiveParticle`,
  unclassifiedParticle:`${NS}unclassifiedParticle`,
} as const;

/** Numeral subtypes. */
const LexInfoPoS_Numerals = {
  cardinalNumeral:                `${NS}cardinalNumeral`,
  multiplicativeNumeral:          `${NS}multiplicativeNumeral`,
  numeralFraction:                `${NS}numeralFraction`,
  genericNumeral:                 `${NS}genericNumeral`,
  indefiniteCardinalNumeral:      `${NS}indefiniteCardinalNumeral`,
  indefiniteOrdinalNumeral:       `${NS}indefiniteOrdinalNumeral`,
  indefiniteMultiplicativeNumeral:`${NS}indefiniteMultiplicativeNumeral`,
  interrogativeCardinalNumeral:   `${NS}interrogativeCardinalNumeral`,
  interrogativeOrdinalNumeral:    `${NS}interrogativeOrdinalNumeral`,
  interrogativeMultiplicativeNumeral:`${NS}interrogativeMultiplicativeNumeral`,
} as const;

/** Punctuation and symbol subtypes. */
const LexInfoPoS_Symbols = {
  punctuation:     `${NS}punctuation`,
  comma:           `${NS}comma`,
  colon:           `${NS}colon`,
  semiColon:       `${NS}semiColon`,
  slash:           `${NS}slash`,
  bullet:          `${NS}bullet`,
  suspensionPoints:`${NS}suspensionPoints`,
  questionMark:    `${NS}questionMark`,
  exclamativePoint:`${NS}exclamativePoint`,
  openParenthesis: `${NS}openParenthesis`,
  closeParenthesis:`${NS}closeParenthesis`,
  invertedComma:   `${NS}invertedComma`,
  point:           `${NS}point`,
  letter:          `${NS}letter`,
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

// ─────────────────────────────────────────────────────────────────────────────
// Term type
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Term-type values from the LexInfo ontology v3.0.
 *
 * `TermType` classifies the form or origin of a lexical entry rather than
 * its grammatical role. It is a distinct dimension from part-of-speech and
 * is set via the `lexinfo:termType` property.
 */
export const LexInfoTermType = {
  // ── Abbreviated forms ──────────────────────────────────────────────────
  /** Any abbreviated form (superclass of acronym, initialism, clippedTerm, contraction). */
  abbreviatedForm: `${NS}abbreviatedForm`,
  /** An abbreviation pronounced as a word (e.g. 'NATO', 'laser'). */
  acronym:         `${NS}acronym`,
  /** An abbreviation pronounced letter-by-letter (e.g. 'FBI', 'HTML'). */
  initialism:      `${NS}initialism`,
  /** A shortened form produced by truncating the full term (e.g. 'flu' from 'influenza'). */
  clippedTerm:     `${NS}clippedTerm`,
  /** A generic abbreviated form. */
  abbreviation:    `${NS}abbreviation`,
  /** A contraction formed by omitting sounds or letters (e.g. "don't"). */
  contraction:     `${NS}contraction`,

  // ── Multiword / phrasal forms ──────────────────────────────────────────
  /** A lexical unit combining two or more words whose combined meaning is not compositional. */
  compound:            `${NS}compound`,
  /** A fixed, lexicalised phrase whose meaning cannot be derived from its parts. */
  idiom:               `${NS}idiom`,
  /** Any group of two or more words forming a fixed unit (broader than idiom). */
  phraseologicalUnit:  `${NS}phraseologicalUnit`,
  /** A fixed, recurring chunk of text. */
  setPhrase:           `${NS}setPhrase`,
  /** A brief popular saying or maxim. */
  proverb:             `${NS}proverb`,

  // ── Length variants ────────────────────────────────────────────────────
  /** The complete, expanded form of a term for which an abbreviated form exists. */
  fullForm:  `${NS}fullForm`,
  /** A variant of a multiword term that uses fewer words than the full form. */
  shortForm: `${NS}shortForm`,

  // ── Scientific / technical forms ──────────────────────────────────────
  /** A term that is part of an international scientific nomenclature. */
  internationalScientificTerm: `${NS}internationalScientificTerm`,
  /** A term with the same or nearly identical form across many languages. */
  internationalism:            `${NS}internationalism`,
  /** A synonym for an international scientific term used in general discourse. */
  commonName:                  `${NS}commonName`,
  /** A lexical unit in a CJKV language represented by two or more CJKV characters. */
  CJK_compound:                `${NS}CJK_compound`,

  // ── Formulaic expressions ──────────────────────────────────────────────
  /** Figures or symbols used to express a concept briefly (e.g. a chemical or mathematical formula). */
  formula:           `${NS}formula`,
  /** An expression representing a concept via a mathematical equality or assignment. */
  equation:          `${NS}equation`,
  /** An expression using mathematical or logical relations (inequalities, sets, Boolean operations). */
  logicalExpression: `${NS}logicalExpression`,

  // ── Commercial identifiers ─────────────────────────────────────────────
  /** The official designator for a product. */
  productName: `${NS}productName`,
  /** A unique alphanumeric manufacturing part number. */
  partNumber:  `${NS}partNumber`,
  /** A unique alphanumeric inventory item identifier (Stock Keeping Unit). */
  sku:         `${NS}sku`,

  // ── Miscellaneous ──────────────────────────────────────────────────────
  /** The term that heads a terminological entry. */
  entryTerm:     `${NS}entryTerm`,
  /** A significant word or phrase. */
  expression:    `${NS}expression`,
  /** The nucleus (head) of a multiword or multi-morphemic compound term. */
  nucleus:       `${NS}nucleus`,
  /** A symbol or glyph representing an idea, concept, or object. */
  symbol:        `${NS}symbol`,
  /** A chunk of text used in a software interface, documentation, or help file. */
  string:        `${NS}string`,
  /** A type value assigned to a string. */
  stringCategory:`${NS}stringCategory`,
  /** A fixed chunk of recurring text. */
  standardText:  `${NS}standardText`,
} as const;
export type LexInfoTermType = (typeof LexInfoTermType)[keyof typeof LexInfoTermType];

// ─────────────────────────────────────────────────────────────────────────────
// Grammatical gender
// ─────────────────────────────────────────────────────────────────────────────

/** Grammatical gender values from the LexInfo ontology. */
export const LexInfoGender = {
  masculine: `${NS}masculine`,
  feminine:  `${NS}feminine`,
  neuter:    `${NS}neuter`,
  common:    `${NS}commonGender`,
} as const;
export type LexInfoGender = (typeof LexInfoGender)[keyof typeof LexInfoGender];

// ─────────────────────────────────────────────────────────────────────────────
// Grammatical number
// ─────────────────────────────────────────────────────────────────────────────

/** Grammatical number values from the LexInfo ontology. */
export const LexInfoNumber = {
  singular: `${NS}singular`,
  plural:   `${NS}plural`,
  dual:     `${NS}dual`,
} as const;
export type LexInfoNumber = (typeof LexInfoNumber)[keyof typeof LexInfoNumber];

// ─────────────────────────────────────────────────────────────────────────────
// Grammatical tense
// ─────────────────────────────────────────────────────────────────────────────

/** Grammatical tense values from the LexInfo ontology. */
export const LexInfoTense = {
  present: `${NS}presentTense`,
  past:    `${NS}pastTense`,
  future:  `${NS}futureTense`,
} as const;
export type LexInfoTense = (typeof LexInfoTense)[keyof typeof LexInfoTense];

// ─────────────────────────────────────────────────────────────────────────────
// Grammatical mood
// ─────────────────────────────────────────────────────────────────────────────

/** Grammatical mood values from the LexInfo ontology. */
export const LexInfoMood = {
  indicative:  `${NS}indicativeMood`,
  subjunctive: `${NS}subjunctiveMood`,
  imperative:  `${NS}imperativeMood`,
  conditional: `${NS}conditionalMood`,
  optative:    `${NS}optativeMood`,
} as const;
export type LexInfoMood = (typeof LexInfoMood)[keyof typeof LexInfoMood];

// ─────────────────────────────────────────────────────────────────────────────
// Grammatical voice
// ─────────────────────────────────────────────────────────────────────────────

/** Grammatical voice values from the LexInfo ontology. */
export const LexInfoVoice = {
  active:  `${NS}activeVoice`,
  passive: `${NS}passiveVoice`,
  middle:  `${NS}middleVoice`,
} as const;
export type LexInfoVoice = (typeof LexInfoVoice)[keyof typeof LexInfoVoice];

// ─────────────────────────────────────────────────────────────────────────────
// Grammatical person
// ─────────────────────────────────────────────────────────────────────────────

/** Grammatical person values from the LexInfo ontology. */
export const LexInfoPerson = {
  first:  `${NS}firstPerson`,
  second: `${NS}secondPerson`,
  third:  `${NS}thirdPerson`,
} as const;
export type LexInfoPerson = (typeof LexInfoPerson)[keyof typeof LexInfoPerson];

// ─────────────────────────────────────────────────────────────────────────────
// Grammatical case
// ─────────────────────────────────────────────────────────────────────────────

/** Grammatical case values from the LexInfo ontology. */
export const LexInfoCase = {
  nominative:   `${NS}nominativeCase`,
  accusative:   `${NS}accusativeCase`,
  genitive:     `${NS}genitiveCase`,
  dative:       `${NS}dativeCase`,
  ablative:     `${NS}ablativeCase`,
  instrumental: `${NS}instrumentalCase`,
  locative:     `${NS}locativeCase`,
  vocative:     `${NS}vocativeCase`,
} as const;
export type LexInfoCase = (typeof LexInfoCase)[keyof typeof LexInfoCase];

// ─────────────────────────────────────────────────────────────────────────────
// Degree of comparison
// ─────────────────────────────────────────────────────────────────────────────

/** Grammatical degree of comparison values from the LexInfo ontology. */
export const LexInfoDegree = {
positive:    `${NS}positiveDegree`,
  comparative: `${NS}comparativeDegree`,
  superlative: `${NS}superlativeDegree`,
} as const;
export type LexInfoDegree = (typeof LexInfoDegree)[keyof typeof LexInfoDegree];

// ─────────────────────────────────────────────────────────────────────────────
// Grammatical aspect
// ─────────────────────────────────────────────────────────────────────────────

/** Grammatical aspect values from the LexInfo ontology. */
export const LexInfoAspect = {
  perfective:   `${NS}perfectiveAspect`,
  imperfective: `${NS}imperfectiveAspect`,
  progressive:  `${NS}progressiveAspect`,
} as const;
export type LexInfoAspect = (typeof LexInfoAspect)[keyof typeof LexInfoAspect];

// ─────────────────────────────────────────────────────────────────────────────
// Definiteness
// ─────────────────────────────────────────────────────────────────────────────

/** Definiteness values from the LexInfo ontology. */
export const LexInfoDefiniteness = {
  definite:   `${NS}definiteness-definite`,
  indefinite: `${NS}definiteness-indefinite`,
} as const;
export type LexInfoDefiniteness =
  (typeof LexInfoDefiniteness)[keyof typeof LexInfoDefiniteness];
