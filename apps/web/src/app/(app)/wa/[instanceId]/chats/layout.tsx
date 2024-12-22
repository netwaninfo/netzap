import type { PropsWithChildren } from 'react'
import { ChatsSidebar } from './components/chats-sidebar'

interface LayoutProps extends PropsWithChildren {}

export default function ChatsLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-1 w-full h-full">
      <ChatsSidebar />

      <main className="flex-1 h-full">{children}</main>
    </div>
  )
}
