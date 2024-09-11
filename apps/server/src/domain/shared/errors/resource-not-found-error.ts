interface ResourceNotFoundErrorProps {
  id: string
}

export class ResourceNotFoundError extends Error {
  constructor({ id }: ResourceNotFoundErrorProps) {
    super(`Resource "${id}" not found`)
  }
}
