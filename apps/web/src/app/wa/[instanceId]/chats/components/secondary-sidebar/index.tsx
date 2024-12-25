import { Suspense } from 'react'

import { FETCH_LIMIT } from '@/consts'

import { Sidebar, SidebarContent, SidebarHeader } from '@/components/ui/sidebar'
import { ScrollArea } from '@netzap/ui/components/scroll-area'
import { H4 } from '@netzap/ui/components/typography'

import { ChatsList } from './chats/chats-list'
import { ChatsListSkeleton } from './chats/chats-list-skeleton'
import { ContactsSheet } from './contacts/contacts-sheet'

export function SecondarySidebar() {
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
          <div className="space-y-1 py-2 px-3">
            <Suspense fallback={<ChatsListSkeleton amount={FETCH_LIMIT} />}>
              <ChatsList limit={FETCH_LIMIT} />
            </Suspense>
          </div>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  )
}
