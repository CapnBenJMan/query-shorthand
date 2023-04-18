import { Attribute } from "./ElemComponents"

export type stage = "start" | "child" | "gen" | "adj" | "desc"
export type pseudo = `:${string}`



export type htmlTags = HTMLElementTagNameMap
export type svgTags = SVGElementTagNameMap

type elemId = `#${string}`
type elemClass = `.${string}`
type elemAttr = `[${string}]`
type elemPSC = `:${string}${`(${string})` | ""}`
type elemPSE = `::${string}${`(${string})` | ""}`
type elemAfter = Exclude<`${elemId | ""}${elemClass | ""}${elemAttr | ""}${elemPSC | ""}${elemPSE | ""}`, "">
export type elemName<X extends string> =
	X extends keyof htmlTags | keyof svgTags ?
	X :
	X extends `${infer A extends string}${elemAfter}` ?
	A extends `${string}${elemAfter}` ?
	never :
	A :
	"elem"



export type Presence = typeof Attribute.presence

export type pVals = Presence[keyof Presence]

export type attrSensitive = ` ${"i" | "I" | "s" | "S"} ` | "none"
