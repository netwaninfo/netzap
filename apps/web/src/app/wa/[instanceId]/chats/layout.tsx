import type { PropsWithChildren } from 'react'

import { SecondarySidebar } from './components/secondary-sidebar'

interface ChatsLayoutProps extends PropsWithChildren {}

export default function ChatsLayout({ children }: ChatsLayoutProps) {
  return (
    <div className="flex flex-1 w-full h-full">
      <SecondarySidebar />

      <main className="flex-1 h-full">{children}</main>
    </div>
  )
}
