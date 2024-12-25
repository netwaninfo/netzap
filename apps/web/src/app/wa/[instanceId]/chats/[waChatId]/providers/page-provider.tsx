'use client'

import type { Chat } from '@netzap/entities/chat'
import {
  type PropsWithChildren,
  type RefObject,
  createContext,
  useContext,
  useRef,
} from 'react'

import { useGetChat } from '@/hooks/queries/use-get-chat'
import { useChatParams } from '@/hooks/use-chat-params'

interface PageContextValue {
  chat: Chat
  scrollRef: RefObject<HTMLDivElement>
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
