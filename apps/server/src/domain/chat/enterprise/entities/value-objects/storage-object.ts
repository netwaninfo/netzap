import { ValueObject } from '@/core/entities/value-object'
import type { MimeType } from './mime-type'

export interface StorageObjectProps {
	path: string
	url: string
	mimeType: MimeType
}

export class StorageObject extends ValueObject<StorageObjectProps> {
	get path() {
		return this.props.path
	}

	get url() {
		return this.props.url
	}

	get mimeType() {
		return this.props.mimeType
	}

	static create({ ...props }: StorageObjectProps) {
		return new StorageObject({ ...props })
	}
}