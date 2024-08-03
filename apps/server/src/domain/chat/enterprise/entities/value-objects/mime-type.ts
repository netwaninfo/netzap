import mime from 'mime-types'

export class MimeType {
	private value: string

	protected constructor(value: string) {
		this.value = value
	}

	extension() {
		return mime.extension(this.value) || 'unknown'
	}

	toString() {
		return this.value
	}

	static createFromFilename(filename: string) {
		const mimeType = mime.lookup(filename)
		if (!mimeType) throw new Error(`Invalid mimetype of "${filename}"`)

		return new MimeType(mimeType)
	}

	static create(value: string) {
		return new MimeType(value)
	}
}
