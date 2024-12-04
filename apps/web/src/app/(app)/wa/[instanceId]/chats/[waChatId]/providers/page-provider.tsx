'use client'

import { useGetChat } from '@/hooks/queries/use-get-chat'
import { useChatParams } from '@/hooks/use-chat-params'
import { Chat } from '@netzap/entities/chat'
import { PropsWithChildren, createContext, useContext } from 'react'

interface PageContextValue {
  chat: Chat
}

const PageContext = createContext({} as PageContextValue)

export function PageProvider({ children }: PropsWithChildren) {
  const { instanceId, waChatId } = useChatParams()
  const [{ data: chat }] = useGetChat({ params: { instanceId, waChatId } })

  return (
    <PageContext.Provider value={{ chat }}>{children}</PageContext.Provider>
  )
}

export const usePageContext = () => useContext(PageContext)
