import { ValueObject } from '@/core/entities/value-object'

export type WAEntityNode = 'c.us' | 'g.us' | 'lid'

export interface WAEntityIDProps {
	node: WAEntityNode
	ref: string
}

export class WAEntityID extends ValueObject<WAEntityIDProps> {
	get node() {
		return this.props.node
	}

	get ref() {
		return this.props.ref
	}

	/**
	 * @example '5511945327809-1516769250@g.us'
	 * @example '5511985637214@c.us'
	 */
	override toString() {
		return `${this.ref}@${this.node}`
	}

	override equals(id: WAEntityID) {
		return id.toString() === this.toString()
	}

	static createFromString(value: string) {
		const [waRef, waNode] = value.split('@')
		if (!waRef || !waNode) {
			throw new Error(`Invalid value format for "${value}"`)
		}

		const ref = waRef.replaceAll(':', '').trim()
		const node = waNode as WAEntityNode

		return new WAEntityID({ ref, node })
	}
}
