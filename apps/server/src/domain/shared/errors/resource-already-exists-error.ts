interface ResourceAlreadyExistsErrorProps {
	id: string
}

export class ResourceAlreadyExistsError extends Error {
	constructor({ id }: ResourceAlreadyExistsErrorProps) {
		super(`Resource "${id}" already exists`)
	}
}
