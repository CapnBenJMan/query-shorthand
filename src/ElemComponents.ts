import type { Presence, attrSensitive, pVals } from "./types"

export class Attribute {
	name: string
	type: keyof Presence = "present"
	value: string = ""
	sensitivity: attrSensitive = "none"

	constructor(str: `[${string}${"" | `=${string}`}]`) {
		const nStr = str.slice(1, -1)
		if (nStr.includes("=")) {
			const [name, after] = nStr.split("=")
			const type = name.slice(-1)
			if (_a(type)) {
				this.type = Attribute.swappedPresence[`${type}=`]
				this.name = name.slice(0, -1)
			} else {
				this.type = "exact"
				this.name = name
			}

			if (["i", "I", "s", "S"].some(x => after.endsWith(` ${x} `)))
				this.sensitivity = after.match(/ [is]$/i)![0] as attrSensitive

			this.value = after.replace(/ [is]$/gi, "")
		} else {
			this.name = nStr
		}

		function _a(t: string): t is Exclude<pVals, "" | "="> extends `${infer T}=` ? T : never {
			return Object.values(Attribute.presence).includes(t + "=" as pVals)
		}
	}

	static readonly presence = {
		"present": "",
		"exact": "=",
		"listMember": "~=",
		"beginsWithBar": "|=",
		"beginsWith": "^=",
		"endsWith": "$=",
		"contains": "*="
	} as const

	static readonly swappedPresence = pivotObject(this.presence)

	toString() {
		return `[${this.name}${Attribute.presence[this.type]}${this.value}${this.sensitivity == "none" ? "" : this.sensitivity}]`
	}
}

function pivotObject<O extends Record<PropertyKey, PropertyKey>>(
	obj: O
): { [K in keyof O as O[K]]: K } {
	const e = Object.entries(obj).map(([k, v]) => [v, k])
	return Object.fromEntries(e)
}


class Pseudo {

	constructor(
		public name: `:${string} `,
		public functional: boolean = false,
		public value: "" | `(${string})` = ""
	) { }

	static parenMatcher = /\(.+\)/

	toString() {
		return `${this.name}${this.value} `
	}
}

export class PseudoClass extends Pseudo {

	constructor(str: `:${string} `) {
		const boolean = ["(", ")"].every(x => str.includes(x))
		const value = str.match(Pseudo.parenMatcher)?.[0] ?? ""
		super(str.replace(Pseudo.parenMatcher, "") as typeof str, boolean, value as ConstructorParameters<typeof Pseudo>[2])
	}
}

export class PseudoElement extends Pseudo {
	declare name: `::${string} `

	constructor(str: `::${string} `) {
		const boolean = ["(", ")"].every(x => str.includes(x))
		const value = str.match(Pseudo.parenMatcher)?.[0] ?? ""
		super(str.replace(Pseudo.parenMatcher, "") as typeof str, boolean, value as ConstructorParameters<typeof Pseudo>[2])
	}
}