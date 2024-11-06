export interface ClerkUserPublicMetadata {
  applications: {
    netzap?: {
      id: string
    }
  }
}

export type ClerkUser = {
  id: string
  refId: string
  name: string
  email: string
}
