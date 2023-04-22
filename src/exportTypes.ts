import type { trim, replace, split, flat, last } from "literal-utility-types"
import type { elemName, htmlTags, svgTags } from "./types"

type splitter<S extends string, D extends string, L extends string, R extends string, Acc extends string[] = []> =
	S extends `${infer A}${D}${infer B}` ?
	A extends L ?
	B extends R ?
	[...Acc, `${A}${D}${B}`] :
	splitter<B, D, L, R, [...Acc, A]> :
	splitter<B, D, L, R, [...Acc, A]> :
	[...Acc, S]
type trimmer<T extends string[]> = {
	[I in keyof T]: trim<T[I]>
}
type mapper1<T extends string[]> = {
	[I in keyof T]: splitter<T[I], " ", `${string}:${"has" | "is" | "where" | "not"}(${string}`, `${string})${string}`>
}

// actual operation
export type parser<
	S_0 extends string,
	S_1 extends string = replace<S_0, `:${"has" | "is" | "where" | "not"}(${string})`, "">,
	S_2 extends string[] = split<S_1, ",">,
	S extends string = trimmer<S_2>[number],
	T1 extends string[] = split<S, ">" | "+" | "~">,
	T2 extends string[] = trimmer<T1>,
	T2_1 extends string[][] = mapper1<T2>,
	// @ts-expect-error
	T2_2 extends string[] = flat<T2_1>,
	// @ts-expect-error
	T3 extends string = last<T2_2>,
> = T3


export type queryParser<
	S extends string,
	// @ts-expect-error
	P extends string = parser<S>
> = elemName<P>

export type queryElem<
	S extends string,
	// @ts-expect-error
	P = queryParser<parser<S>>
> =
	P extends keyof htmlTags
	? htmlTags[P] :
	P extends keyof svgTags
	? svgTags[P] :
	Element

export type { elemName, htmlTags, svgTags } from "./types"