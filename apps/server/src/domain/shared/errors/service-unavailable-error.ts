interface ServiceUnavailableProps {
  name: string
}

export class ServiceUnavailableError extends Error {
  constructor({ name }: ServiceUnavailableProps) {
    super(`Service "${name}" is not available`)
  }
}
