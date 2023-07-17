import { Attribute } from "./ElemComponents"

export type Stage = "start" | "child" | "gen" | "adj" | "desc"
export type Pseudo = `:${string}`



export type HTMLTags = HTMLElementTagNameMap
export type SVGTags = SVGElementTagNameMap

type elemId = `#${string}`
type elemClass = `.${string}`
type elemAttr = `[${string}]`
type elemPSC = `:${string}${`(${string})` | ""}`
type elemPSE = `::${string}${`(${string})` | ""}`
type elemAfter = Exclude<`${elemId | ""}${elemClass | ""}${elemAttr | ""}${elemPSC | ""}${elemPSE | ""}`, "">
export type ElemName<X extends string> =
	X extends keyof HTMLTags | keyof SVGTags ?
	X :
	X extends `${infer A extends string}${elemAfter}` ?
	A extends `${string}${elemAfter}` ?
	never :
	A :
	"elem"



export type Presence = typeof Attribute.presence

export type PresenceVals = Presence[keyof Presence]

export type AttrSensitive = ` ${"i" | "I" | "s" | "S"} ` | "none"

export interface Queryable { querySelector(selector: string): Node }
export interface QueryAllable { querySelectorAll<K extends Node>(selector: string): NodeListOf<K> }
