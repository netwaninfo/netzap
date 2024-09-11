export interface ClerkUserPublicMetadata {
  applications: {
    netzap?: {
      id: string
    }
  }
}

export type ClerkUser = {
  id: string
  name: string
  email: string
  internalId: string
}
