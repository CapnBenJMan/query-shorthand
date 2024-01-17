import { Queryable, QueryAllable } from "./types"
import { QueryElem } from "./exportTypes"

declare global {
	interface NodeListOf<TNode extends Node> {
		[Symbol.iterator](): IterableIterator<TNode>
	}
}

/** A shorthand for `document.getElementByID` without null checking */
export function ID<E extends HTMLElement | SVGElement = HTMLElement>(id: string) {
	return document.getElementById(id) as E
}
/** A shorthand for `document.getElementByID` with null checking */
export function IDNull<E extends HTMLElement | SVGElement = HTMLElement>(id: string) {
	return document.getElementById(id) as E | null
}

/**
 * A shorthand for calling the `querySelector` method on an element and providing strong type interpretation without null checking
 * @param query The query string
 * @param element The element to call the method on (defaults to `document`)
 */
export function qry<K extends string>(query: K, element: Queryable = document) {
	return element.querySelector(query) as QueryElem<K>
}
/**
 * A shorthand for calling the `querySelector` method on an element and providing strong type interpretation with null checking
 * @param query The query string
 * @param element The element to call the method on (defaults to `document`)
 */
export function qryNull<K extends string>(query: K, element: Queryable = document) {
	return element.querySelector(query) as QueryElem<K> | null
}

/**
 * A shorthand for calling the `querySelectorAll` method on an element and providing strong type interpretation
 * @param query The query string
 * @param element The element to call the method on (defaults to `document`)
 * @returns An array of the queried elements
 */
export function qryA<K extends string>(selector: K, element: QueryAllable = document) {
	return [...(element.querySelectorAll(selector) as NodeListOf<QueryElem<K>>)]
}