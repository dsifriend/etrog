import type { Component } from "../decomp/index.js";
import { langString } from "../langstring.js";
import type { LexInfoPoS } from "../lexinfo/index.js";
import type {
	Form,
	LexicalConcept,
	LexicalEntry,
	LexicalSense,
} from "../ontolex/index.js";
import type { SyntacticFrame } from "../synsem/index.js";
import type { LangString, LanguageTag, URI, XSDDate } from "../types/index.js";

/**
 * Fluent builder for `ontolex:LexicalEntry` objects.
 *
 * @example
 * const entry = new LexicalEntryBuilder("urn:uuid:..." as URI, "en" as LanguageTag)
 *   .setCanonicalForm(form)
 *   .setPoS(LexInfoPoS.noun)
 *   .build();
 */
export class LexicalEntryBuilder {
	private readonly data: LexicalEntry;

	/**
	 * Initialises the builder with the given URI and language.
	 * @param id - The URI for this lexical entry.
	 * @param language - The BCP 47 language tag of the entry.
	 */
	constructor(id: URI, canonicalForm: Form, language: LanguageTag) {
		this.data = {
			"@id": id,
			"@type": "ontolex:LexicalEntry",
			"ontolex:canonicalForm": canonicalForm,
			"lime:language": language,
		};
	}

	/**
	 * Sets the canonical (dictionary) form.
	 * @param form - The canonical `Form`.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setCanonicalForm(form)
	 */
	setCanonicalForm(form: Form): this {
		this.data["ontolex:canonicalForm"] = form;
		return this;
	}

	/**
	 * Adds an inflected or alternative form (idempotent by `@id`).
	 * @param form - An `otherForm` `Form` object.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addOtherForm(pluralForm)
	 */
	addOtherForm(form: Form): this {
		this.data["ontolex:otherForm"] ??= [];
		const existing = this.data["ontolex:otherForm"];
		if (!existing.some((f) => f["@id"] === form["@id"])) {
			existing.push(form);
		}
		return this;
	}

	/**
	 * Adds a lexical form (idempotent by `@id`).
	 * @param form - A `lexicalForm` `Form` object.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addLexicalForm(variantForm)
	 */
	addLexicalForm(form: Form): this {
		this.data["ontolex:lexicalForm"] ??= [];
		const existing = this.data["ontolex:lexicalForm"];
		if (!existing.some((f) => f["@id"] === form["@id"])) {
			existing.push(form);
		}
		return this;
	}

	/**
	 * Adds a lexical concept evoked by this entry (idempotent by `@id`).
	 * @param concept - The `LexicalConcept` to add.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addEvokes(concept)
	 */
	addEvokes(concept: LexicalConcept): this {
		this.data["ontolex:evokes"] ??= [];
		const evokes = this.data["ontolex:evokes"];
		if (!evokes.some((item) => item["@id"] === concept["@id"])) {
			evokes.push(concept);
		}
		return this;
	}

	/**
	 * Adds a lexical sense (idempotent by `@id`).
	 * @param sense - The `LexicalSense` to add.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addSense(sense)
	 */
	addSense(sense: LexicalSense): this {
		this.data["ontolex:sense"] ??= [];
		const existing = this.data["ontolex:sense"];
		if (!existing.some((s) => s["@id"] === sense["@id"])) {
			existing.push(sense);
		}
		return this;
	}

	/**
	 * Adds a direct denotation link to an ontology entity (idempotent).
	 * @param uri - URI of the ontology entity.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addDenotes("https://dbpedia.org/resource/House" as URI)
	 */
	addDenotes(uri: URI): this {
		this.data["ontolex:denotes"] ??= [];
		const denotes = this.data["ontolex:denotes"];
		if (!denotes.includes(uri)) {
			denotes.push(uri);
		}
		return this;
	}

	/**
	 * Adds a morphological pattern reference (idempotent).
	 * @param uri - URI of the morphological pattern.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addMorphologicalPattern("https://example.org/morphology/declension" as URI)
	 */
	addMorphologicalPattern(uri: URI): this {
		this.data["ontolex:morphologicalPattern"] ??= [];
		const patterns = this.data["ontolex:morphologicalPattern"];
		if (!patterns.includes(uri)) {
			patterns.push(uri);
		}
		return this;
	}

	/**
	 * Sets the part-of-speech to a single value (replaces any existing PoS).
	 * @param pos - A `LexInfoPoS` value.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setPoS(LexInfoPoS.noun)
	 */
	setPoS(pos: LexInfoPoS): this {
		this.data["lexinfo:partOfSpeech"] = [pos];
		return this;
	}

	/**
	 * Appends a part-of-speech value (idempotent).
	 * @param pos - A `LexInfoPoS` value.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addPoS(LexInfoPoS.adjective)
	 */
	addPoS(pos: LexInfoPoS): this {
		this.data["lexinfo:partOfSpeech"] ??= [];
		const partOfSpeech = this.data["lexinfo:partOfSpeech"];
		if (!partOfSpeech.includes(pos)) {
			partOfSpeech.push(pos);
		}
		return this;
	}

	/**
	 * Adds a subterm link (simple, without ordering).
	 * @param subtermUri - URI of a constituent entry.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addSubterm("urn:uuid:entry-fever" as URI)
	 */
	addSubterm(subtermUri: URI): this {
		this.data["decomp:subterm"] ??= [];
		const subterms = this.data["decomp:subterm"];
		if (!subterms.includes(subtermUri)) {
			subterms.push(subtermUri);
		}
		return this;
	}

	/**
	 * Adds an ordered constituent component (idempotent by `@id`).
	 * @param component - A `decomp:Component` with structural information.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addConstituent(component)
	 */
	addConstituent(component: Component): this {
		this.data["decomp:constituent"] ??= [];
		const constituents = this.data["decomp:constituent"];
		if (!constituents.some((c) => c["@id"] === component["@id"])) {
			constituents.push(component);
		}
		return this;
	}

	/**
	 * Adds a lexical relation shortcut URI (idempotent).
	 * @param targetUri - URI of the related lexical entry.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addLexicalRel("urn:uuid:entry-b" as URI)
	 */
	addLexicalRel(targetUri: URI): this {
		this.data["vartrans:lexicalRel"] ??= [];
		const lexicalRel = this.data["vartrans:lexicalRel"];
		if (!lexicalRel.includes(targetUri)) {
			lexicalRel.push(targetUri);
		}
		return this;
	}

	/**
	 * Adds a translation shortcut URI (idempotent).
	 * @param targetUri - URI of the translated entry.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addTranslation("urn:uuid:entry-maison" as URI)
	 */
	addTranslation(targetUri: URI): this {
		this.data["vartrans:translation"] ??= [];
		const translation = this.data["vartrans:translation"];
		if (!translation.includes(targetUri)) {
			translation.push(targetUri);
		}
		return this;
	}

	/**
	 * Sets the source URI for this lexical entry.
	 * @param uri - URI of the source.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setSource("https://example.org/corpus/entry-1" as URI)
	 */
	setSource(uri: URI): this {
		this.data["dcterms:source"] = uri;
		return this;
	}

	/**
	 * Sets the creation date of this lexical entry.
	 * @param date - The creation date as an XSD date.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setCreated("2025-01-15" as XSDDate)
	 */
	setCreated(date: XSDDate): this {
		this.data["dcterms:created"] = date;
		return this;
	}

	/**
	 * Sets the last modification date of this lexical entry.
	 * @param date - The modification date as an XSD date.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setModified("2025-02-01" as XSDDate)
	 */
	setModified(date: XSDDate): this {
		this.data["dcterms:modified"] = date;
		return this;
	}

	/**
	 * Sets the creator name of this lexical entry.
	 * @param name - The creator's name.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setCreator("Etrog Project")
	 */
	setCreator(name: string): this {
		this.data["dcterms:creator"] = name;
		return this;
	}

	/**
	 * Adds a related resource URI (idempotent).
	 * @param uri - URI of the related resource.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addSeeAlso("https://example.org/entry/house" as URI)
	 */
	addSeeAlso(uri: URI): this {
		this.data["rdfs:seeAlso"] ??= [];
		const seeAlso = this.data["rdfs:seeAlso"];
		if (!seeAlso.includes(uri)) {
			seeAlso.push(uri);
		}
		return this;
	}

	/**
	 * Sets an `rdfs:label` in the given language.
	 * @param value - The label text.
	 * @param lang - The BCP 47 language tag.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setLabel("house", "en" as LanguageTag)
	 */
	setLabel(value: string, lang: LanguageTag): this {
		this.data["rdfs:label"] ??= [];
		const labels = this.data["rdfs:label"];
		labels.push(langString(value, lang));
		return this;
	}

	/**
	 * Adds a comment in the given language.
	 * @param text - The multilingual comment text.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addComment(langString("A temporary note", "en" as LanguageTag))
	 */
	addComment(text: LangString): this {
		this.data["rdfs:comment"] ??= [];
		const comments = this.data["rdfs:comment"];
		comments.push(text);
		return this;
	}

	/**
	 * Adds a syntactic frame (idempotent by `@id`).
	 * @param frame - The `SyntacticFrame` to add.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addSynBehavior(frame)
	 */
	addSynBehavior(frame: SyntacticFrame): this {
		this.data["synsem:synBehavior"] ??= [];
		const synBehaviors = this.data["synsem:synBehavior"];
		if (!synBehaviors.some((f) => f["@id"] === frame["@id"])) {
			synBehaviors.push(frame);
		}
		return this;
	}

	/**
	 * Returns the built `LexicalEntry` plain object.
	 * @returns The constructed `LexicalEntry`.
	 *
	 * @example
	 * const entry = builder.build();
	 */
	build(): LexicalEntry {
		return { ...this.data };
	}
}
