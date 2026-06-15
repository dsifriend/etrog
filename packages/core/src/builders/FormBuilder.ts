import { langString } from "../langstring.js";
import type {
	LexInfoCase,
	LexInfoDegree,
	LexInfoGender,
	LexInfoMood,
	LexInfoNumber,
	LexInfoPerson,
	LexInfoTense,
	LexInfoVoice,
} from "../lexinfo/index.js";
import type { Form } from "../ontolex/index.js";
import type { LanguageTag, URI } from "../types/index.js";

/**
 * Fluent builder for `ontolex:Form` objects.
 *
 * @example
 * const form = new FormBuilder("urn:uuid:..." as URI)
 *   .addWrittenRep("house", "en" as LanguageTag)
 *   .setNumber(LexInfoNumber.singular)
 *   .build();
 */
export class FormBuilder {
	private readonly data: Form;

	/**
	 * Initialises the builder with the given URI as `@id`.
	 * @param id - The URI for this form.
	 */
	constructor(id: URI) {
		this.data = {
			"@id": id,
			"@type": "ontolex:Form",
			"ontolex:writtenRep": [],
		};
	}

	/**
	 * Adds a written representation in the given language.
	 * @param value - The written form text.
	 * @param lang - The BCP 47 language tag.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addWrittenRep("maison", "fr" as LanguageTag)
	 */
	addWrittenRep(value: string, lang: LanguageTag): this {
		this.data["ontolex:writtenRep"].push(langString(value, lang));
		return this;
	}

	/**
	 * Adds a phonetic representation in the given language.
	 * @param value - The phonetic form text (e.g. IPA).
	 * @param lang - The BCP 47 language tag.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.addPhoneticRep("/haʊs/", "en" as LanguageTag)
	 */
	addPhoneticRep(value: string, lang: LanguageTag): this {
		this.data["ontolex:phoneticRep"] ??= [];
		const phoneticReps = this.data["ontolex:phoneticRep"];
		phoneticReps.push(langString(value, lang));
		return this;
	}

	/**
	 * Sets the grammatical gender.
	 * @param g - A `LexInfoGender` value.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setGender(LexInfoGender.masculine)
	 */
	setGender(g: LexInfoGender): this {
		this.data["lexinfo:gender"] = [g];
		return this;
	}

	/**
	 * Sets the grammatical number.
	 * @param n - A `LexInfoNumber` value.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setNumber(LexInfoNumber.plural)
	 */
	setNumber(n: LexInfoNumber): this {
		this.data["lexinfo:number"] = [n];
		return this;
	}

	/**
	 * Sets the grammatical case.
	 * @param c - A `LexInfoCase` value.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setCase(LexInfoCase.nominative)
	 */
	setCase(c: LexInfoCase): this {
		this.data["lexinfo:case"] = [c];
		return this;
	}

	/**
	 * Sets the grammatical tense.
	 * @param t - A `LexInfoTense` value.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setTense(LexInfoTense.past)
	 */
	setTense(t: LexInfoTense): this {
		this.data["lexinfo:tense"] = [t];
		return this;
	}

	/**
	 * Sets the grammatical mood.
	 * @param m - A `LexInfoMood` value.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setMood(LexInfoMood.indicative)
	 */
	setMood(m: LexInfoMood): this {
		this.data["lexinfo:mood"] = [m];
		return this;
	}

	/**
	 * Sets the grammatical voice.
	 * @param v - A `LexInfoVoice` value.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setVoice(LexInfoVoice.active)
	 */
	setVoice(v: LexInfoVoice): this {
		this.data["lexinfo:voice"] = [v];
		return this;
	}

	/**
	 * Sets the grammatical person.
	 * @param p - A `LexInfoPerson` value.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setPerson(LexInfoPerson.third)
	 */
	setPerson(p: LexInfoPerson): this {
		this.data["lexinfo:person"] = [p];
		return this;
	}

	/**
	 * Sets the degree of comparison.
	 * @param d - A `LexInfoDegree` value.
	 * @returns `this` for chaining.
	 *
	 * @example
	 * builder.setDegree(LexInfoDegree.comparative)
	 */
	setDegree(d: LexInfoDegree): this {
		this.data["lexinfo:degree"] = [d];
		return this;
	}

	/**
	 * Returns the built `Form` plain object.
	 * @returns The constructed `Form`.
	 *
	 * @example
	 * const form = builder.build();
	 */
	build(): Form {
		return {
			...this.data,
			"ontolex:writtenRep": [...this.data["ontolex:writtenRep"]],
		};
	}
}
