'use client'

import { useGetChat } from '@/hooks/queries/use-get-chat'
import { useChatParams } from '@/hooks/use-chat-params'
import { Chat } from '@netzap/entities/chat'
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useRef,
} from 'react'

interface PageContextValue {
  chat: Chat
  scrollRef: React.RefObject<HTMLDivElement>
}

const PageContext = createContext({} as PageContextValue)

export function PageProvider({ children }: PropsWithChildren) {
  const { instanceId, waChatId } = useChatParams()
  const [{ data: chat }] = useGetChat({ params: { instanceId, waChatId } })

  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <PageContext.Provider value={{ chat, scrollRef }}>
      {children}
    </PageContext.Provider>
  )
}

export const usePageContext = () => useContext(PageContext)
