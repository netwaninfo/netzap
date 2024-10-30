import { ClerkProvider } from '@clerk/nextjs'
import { PropsWithChildren } from 'react'

interface RootProviderProps extends PropsWithChildren {}

export function RootProvider({ children }: RootProviderProps) {
  return <ClerkProvider>{children}</ClerkProvider>
}
