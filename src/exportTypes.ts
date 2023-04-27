import type { Trim, Replace, Split, Flat, Last } from "literal-utility-types"
import type { ElemName, HTMLTags, SVGTags } from "./types"

type splitter<S extends string, D extends string, L extends string, R extends string, Acc extends string[] = []> =
	S extends `${infer A}${D}${infer B}` ?
	A extends L ?
	B extends R ?
	[...Acc, `${A}${D}${B}`] :
	splitter<B, D, L, R, [...Acc, A]> :
	splitter<B, D, L, R, [...Acc, A]> :
	[...Acc, S]
type trimmer<T extends string[]> = {
	[I in keyof T]: Trim<T[I]>
}
type mapper1<T extends string[]> = {
	[I in keyof T]: splitter<T[I], " ", `${string}:${"has" | "is" | "where" | "not"}(${string}`, `${string})${string}`>
}

// actual operation
export type Parser<
	S_0 extends string,
	S_1 extends string = Replace<S_0, `:${"has" | "is" | "where" | "not"}(${string})`, "">,
	S_2 extends string[] = Split<S_1, ",">,
	S extends string = trimmer<S_2>[number],
	T1 extends string[] = Split<S, ">" | "+" | "~">,
	T2 extends string[] = trimmer<T1>,
	T2_1 extends string[][] = mapper1<T2>,
	T2_2 extends string[] = Flat<T2_1>,
	T3 extends string = Last<T2_2>,
> = T3 extends string ? T3 : never


export type queryParser<
	S extends string,
	P extends string = Parser<S>
> = ElemName<P>

export type QueryElem<
	S extends string,
	P = queryParser<Parser<S>>
> =
	P extends keyof HTMLTags
	? HTMLTags[P] :
	P extends keyof SVGTags
	? SVGTags[P] :
	Element

export type { ElemName, HTMLTags, SVGTags } from "./types"