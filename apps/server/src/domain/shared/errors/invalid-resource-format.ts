interface InvalidResourceFormatErrorProps {
	id: string
}

export class InvalidResourceFormatError extends Error {
	constructor({ id }: InvalidResourceFormatErrorProps) {
		super(`Resource "${id}" has invalid format`)
	}
}
