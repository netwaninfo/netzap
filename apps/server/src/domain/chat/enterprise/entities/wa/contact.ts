import { WAEntity } from '@/core/entities/wa-entity'
import type { WAEntityID } from '../value-objects/wa-entity-id'

export interface WAContactProps {
	name: string | null
	pushName: string | null
	shortName: string | null
	number: string
	formattedNumber: string
	isGroup: boolean
	imageUrl: string | null
}

export abstract class WAContact<Props extends WAContactProps> extends WAEntity<
	Props,
	WAEntityID
> {
	get name() {
		return this.props.name
	}

	get pushName() {
		return this.props.pushName
	}

	get shortName() {
		return this.props.shortName
	}

	get defaultName() {
		const checkNames = [this.name, this.shortName, this.pushName]

		const validName = checkNames.find((name) => !!name?.trim())
		if (validName) return validName

		return this.formattedNumber
	}

	get number() {
		return this.props.number
	}

	get formattedNumber() {
		return this.props.formattedNumber
	}

	get imageUrl() {
		return this.props.imageUrl
	}
}
