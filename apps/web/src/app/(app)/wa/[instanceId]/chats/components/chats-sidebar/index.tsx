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

const FETCH_LIMIT = 100

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
            <Suspense fallback={<ChatsListSkeleton amount={FETCH_LIMIT} />}>
              <ChatsList limit={FETCH_LIMIT} />
            </Suspense>
          </ScrollAreaViewport>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  )
}
