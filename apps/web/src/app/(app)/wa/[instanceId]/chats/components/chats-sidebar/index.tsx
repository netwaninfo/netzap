import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from '@/components/custom/sidebar'
import { H4 } from '@/components/custom/typography'
import { Suspense } from 'react'
import { ChatsList } from './chats-list'

export function ChatsSidebar() {
  return (
    <Sidebar className="w-84">
      <SidebarHeader className="p-3 border-b py-4">
        <H4>Conversas</H4>
      </SidebarHeader>

      <SidebarContent className="h-[calc(100%-4rem)]">
        <Suspense fallback="Loading...">
          <ChatsList />
        </Suspense>
      </SidebarContent>
    </Sidebar>
  )
}
