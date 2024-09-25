interface UnhandledErrorProps {
  message: string
}

export class UnhandledError extends Error {
  constructor({ message }: UnhandledErrorProps) {
    super(message)
  }
}
