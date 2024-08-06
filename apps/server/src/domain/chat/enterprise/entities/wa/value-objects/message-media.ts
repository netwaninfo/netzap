import { ValueObject } from '@/core/entities/value-object'
import type { MimeType } from '../../value-objects/mime-type'

export interface WAMessageMediaProps {
	mimeType: MimeType
	data: string
}

export class WAMessageMedia extends ValueObject<WAMessageMediaProps> {
	get mimeType() {
		return this.props.mimeType
	}

	get data() {
		return this.props.data
	}

	static create(props: WAMessageMediaProps) {
		return new WAMessageMedia(props)
	}
}