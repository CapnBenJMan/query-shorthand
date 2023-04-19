export { Selector } from "./Selector"
export { Elem } from "./Elem"
export { Attribute, PseudoClass, PseudoElement } from "./ElemComponents"


export type { parser, queryElem, queryParser, elemName, htmlTags, svgTags } from "./exportTypes"
import type { queryElem } from "./exportTypes"

export const ID = <E extends HTMLElement | SVGElement = HTMLElement>(n: string) => document.getElementById(n) as E

export const qry = <K extends string>(n: K, el: Element | Document = document) => el.querySelector(n) as queryElem<K>

export const qryA = <K extends string>(n: K, el: Element | Document = document) => el.querySelectorAll(n) as NodeListOf<queryElem<K>>