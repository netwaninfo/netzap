import type { PropsWithChildren } from 'react'

import { PageProvider } from './providers/page-provider'

export default function ChatItemLayout({ children }: PropsWithChildren) {
  return <PageProvider>{children}</PageProvider>
}
