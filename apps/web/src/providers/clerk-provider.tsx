import { ptBR } from '@clerk/localizations'
import { ClerkProvider as Provider } from '@clerk/nextjs'
import type { PropsWithChildren } from 'react'

interface ClerkProviderProps extends PropsWithChildren {}

export function ClerkProvider({ children }: ClerkProviderProps) {
  return (
    <Provider localization={ptBR} signInForceRedirectUrl="/wa">
      {children}
    </Provider>
  )
}
