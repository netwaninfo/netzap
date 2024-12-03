'use client'

import { PropsWithChildren, createContext, useContext } from 'react'

import { useFetchChats } from '@/hooks/queries/use-fetch-chats'
import { useChatParams } from '@/hooks/use-chat-params'
import { Chat } from '@netzap/entities/chat'
import { useRouter } from 'next/navigation'

interface PageContextValue {
  currentChat: Chat
}

const PageContext = createContext({} as PageContextValue)

export function PageProvider({ children }: PropsWithChildren) {
  const router = useRouter()
  const { instanceId, waChatId } = useChatParams()

  const [data] = useFetchChats({ params: { instanceId }, query: { page: 1 } })

  const chats = data.pages.flatMap(page => page.data)
  const currentChat = chats.find(chat => chat.waChatId === waChatId)

  if (!currentChat) {
    return router.replace(`/wa/${instanceId}/chats`)
  }

  return (
    <PageContext.Provider value={{ currentChat }}>
      {children}
    </PageContext.Provider>
  )
}

export const usePageContext = () => useContext(PageContext)
