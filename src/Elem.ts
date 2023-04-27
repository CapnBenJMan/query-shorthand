import type { ElemName } from "./types"
import { Attribute, PseudoClass, PseudoElement } from "./ElemComponents"

export class Elem<T extends string = string, S = ElemName<T>> {
	name: S = "elem" as S
	id: string | undefined
	classList = [] as string[]
	attrList = [] as Attribute[]
	psClass = [] as PseudoClass[]
	psElem = [] as PseudoElement[]

	child: Elem | undefined
	descendent: Elem | undefined
	genSibling: Elem | undefined
	adjSibling: Elem | undefined

	constructor(str: T) {
		let nStr = str as string
		// pseudo elemenet
		nStr = nStr.replace(Elem.psElemMatch, val => {
			this.psElem.push(new PseudoElement(val as `::${string} `))
			return ""
		})

		// pseudo class
		nStr = nStr.replace(Elem.psClassMatch, val => {
			this.psClass.push(new PseudoClass(val as `:${string} `))
			return ""
		})

		// attributes
		nStr = nStr.replace(Elem.attrMatch, val => {
			this.attrList.push(new Attribute(val as `[${string}]`))
			return ""
		})

		// classes
		nStr = nStr.replace(Elem.classMatch, val => {
			this.classList.push(val.slice(1))
			return ""
		})

		// id
		nStr = nStr.replace(Elem.idMatch, val => {
			this.id = val
			return ""
		})

		if (nStr != "") this.name = nStr as S
	}

	getName(): S {
		return this.name
	}

	get primeChild() {
		return this.child ?? this.descendent ?? this.adjSibling ?? this.genSibling ?? undefined
	}

	get primeChildConnection() {

		return !!this.child ? " > " :
			!!this.descendent ? " " :
				!!this.adjSibling ? " + " :
					!!this.genSibling ? " ~ " :
						""
	}

	static classMatch = /\.(?:\w|-)+/g

	static idMatch = /#(?:\w|-)+/g

	static attrMatch = /\[(?:\w|-)+(?:(?:~|\||\^|\$|\*)?=(['"]?).+\1(?: [iIsS])??)?\]/g

	static psClassMatch = /(?<!:):(?:\w|-)+(?:\((?:.+?)?\))?/g

	static psElemMatch = /::(?:\w|-)+(?:\((?:.+?)?\))?/g

	static matchElem = /(?:(?:\w|-)*(?:#(?:\w|-)+|\.(?:\w|-)+|\[(?:\w|-)+(?:(?:~|\||\^|\$|\*)?=(['"]?).+\1(?: [iIsS])??)?\]|:?:(?:\w|-)+(?:\((?:.+?)?\))?)+)|(?:\w|-)+/

	toString(): string {
		return `${this.name == "elem" ? "" : this.name
			}${this.id ?? ""
			}${this.classList.map(x => `.${x}`).join("")
			}${this.attrList.join("")
			}${this.psClass.join("")
			}${this.psElem.join("")
			}${this.primeChildConnection
			}${this.primeChild?.toString() ?? ""
			} `
	}
}