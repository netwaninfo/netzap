import type { PropsWithChildren } from 'react'

import { PageProvider } from './providers/page-provider'

export default function Layout({ children }: PropsWithChildren) {
  return <PageProvider>{children}</PageProvider>
}
