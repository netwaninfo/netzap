import { PropsWithChildren } from 'react'

import { ClerkProvider } from './clerk-provider'
import { ReactQueryProvider } from './react-query'

interface RootProviderProps extends PropsWithChildren {}

export function RootProvider({ children }: RootProviderProps) {
  return (
    <ClerkProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </ClerkProvider>
  )
}
