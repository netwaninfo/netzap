import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from '@/components/custom/sidebar'
import { H4 } from '@/components/custom/typography'
import { ScrollArea, ScrollAreaViewport } from '@/components/ui/scroll-area'
import { Suspense } from 'react'
import { ChatsList } from './chats-list'
import { ChatsListSkeleton } from './chats-list-skeleton'
import { ContactsSheet } from './contacts-sheet'

export function ChatsSidebar() {
  return (
    <Sidebar className="w-96">
      <SidebarHeader className="py-3 px-6 border-b justify-between items-center h-16">
        <H4>Conversas</H4>

        <div className="flex items-center">
          <ContactsSheet />
        </div>
      </SidebarHeader>

      <SidebarContent className="min-h-0">
        <ScrollArea className="h-full">
          <ScrollAreaViewport>
            <div className="space-y-1 py-2 px-3">
              <Suspense fallback={<ChatsListSkeleton />}>
                <ChatsList />
              </Suspense>
            </div>
          </ScrollAreaViewport>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  )
}
