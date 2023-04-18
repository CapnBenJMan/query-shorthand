import { Elem } from "./Elem"
import type { stage, pseudo } from "./types"

function _A<X>(o: X): asserts o is NonNullable<X> { }


export class Selector<S extends string> {
	topElem: Elem

	constructor(str: S) {
		let elem: Elem
		let next: stage = "start"
		let nStr = str as string
		while (nStr != "") {

			nStr = nStr.replace(Elem.matchElem, val => {
				elem = new Elem(val)
				return ""
			}).trimStart()

			_A(elem!)
			switch (next) {
				case "start":
					this.topElem = elem
					break
				case "adj":
					this.deepest.adjSibling = elem
					break
				case "child":
					this.deepest.child = elem
					break
				case "desc":
					this.deepest.descendent = elem
					break
				case "gen":
					this.deepest.genSibling = elem
					break
			}

			if (nStr != "")
				switch (true) {
					case nStr.startsWith(">"):
						next = "child"
						break
					case nStr.startsWith("~"):
						next = "gen"
						break
					case nStr.startsWith("+"):
						next = "adj"
						break
					default:
						next = "desc"
						break
				}

			if (next != "desc") nStr = nStr.slice(1).trimStart()
		}

		// @ts-ignore
		_A(this.topElem!)
	}

	get deepest() {
		let elem = this.topElem
		while (!!elem.primeChild) {
			elem = elem.primeChild
		}

		return elem
	}


	private static pseudos = new Map<`$${number}$`, pseudo>()
	private static pseudoCount = 0
	private static replacer = (val: string) => {
		this.pseudos.set(`$${this.pseudoCount}$`, val as pseudo)
		return `$${this.pseudoCount++}$`
	}

	static parse(str: string) {
		console.log("\x1b[31m" + str + "\x1b[0m")

		str = str.replace(Elem.psClassMatch, this.replacer)
		str = str.replace(Elem.psElemMatch, this.replacer)

		const grouped = str.split(Selector.groupMatch).map(x => {

			for (let key of this.pseudos.keys()) {
				if (x.includes(key)) {
					x = x.replace(key, this.pseudos.get(key)!)
					this.pseudos.delete(key)
				}
			}

			return new Selector(x)
		})
		console.log(grouped.join(", "))
		console.log()
		return grouped
	}

	static groupMatch = /\s*?,\s*?/g

	static descendantMatch = /\s+?/g

	static childMatch = /\s*?>\s*?/g

	static genSiblingMatch = /\s*?~\s*?/g

	static adjSiblingMatch = /\s*?\+\s*?/g

	toString() {
		return "\x1b[32m" + this.topElem.toString() + "\x1b[0m"
	}
}