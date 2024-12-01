import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from '@/components/custom/sidebar'
import { H4 } from '@/components/custom/typography'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Suspense } from 'react'
import { ChatsList } from './chats-list'
import { ChatsListSkeleton } from './chats-list-skeleton'

export function ChatsSidebar() {
  return (
    <Sidebar className="w-96">
      <SidebarHeader className="py-4 px-6 border-b">
        <H4>Conversas</H4>
      </SidebarHeader>

      <SidebarContent className="h-chats-list">
        <ScrollArea className="h-full px-2.5 w-full">
          <div className="space-y-1 py-2">
            <Suspense fallback={<ChatsListSkeleton />}>
              <ChatsList />
            </Suspense>
          </div>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  )
}
