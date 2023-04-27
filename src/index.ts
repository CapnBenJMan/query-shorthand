export { Selector } from "./Selector"
export { Elem } from "./Elem"
export { Attribute, PseudoClass, PseudoElement } from "./ElemComponents"


export type { Parser, QueryElem, queryParser, ElemName, HTMLTags, SVGTags } from "./exportTypes"
import type { QueryElem } from "./exportTypes"

export const ID = <E extends HTMLElement | SVGElement = HTMLElement>(n: string) => document.getElementById(n) as E

export const qry = <K extends string>(n: K, el: Element | Document = document) => el.querySelector(n) as QueryElem<K>

export const qryA = <K extends string>(n: K, el: Element | Document = document) => el.querySelectorAll(n) as NodeListOf<QueryElem<K>>