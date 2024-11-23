'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Each } from '@/components/utilities/each'
import { useFetchChats } from '@/hooks/queries/use-fetch-chats'
import { useInstanceParams } from '@/hooks/use-instance-params'
import { User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  Chat,
  ChatAvatar,
  ChatAvatarFallback,
  ChatAvatarImage,
  ChatContent,
  ChatContentGroup,
  ChatCounter,
  ChatMessage,
  ChatName,
  ChatTime,
} from '../ui/chat'

export function ChatsList() {
  const { instanceId } = useInstanceParams()
  const [data] = useFetchChats({ params: { instanceId }, query: { page: 1 } })

  const router = useRouter()

  function handleSelectChat(chatId: string) {
    router.push(chatId)
  }

  const chats = data.pages.flatMap(page => page.data)

  return (
    <ScrollArea className="h-full px-2.5 w-full">
      <div className="space-y-1 py-2">
        <Each
          items={chats}
          render={({ item }) => (
            <Chat onClick={() => handleSelectChat(item.id)}>
              <ChatAvatar>
                <ChatAvatarImage src="https://github.com/tevass.png" />
                <ChatAvatarFallback>
                  <User className="size-5 text-muted-foreground" />
                </ChatAvatarFallback>
              </ChatAvatar>

              <ChatContent>
                <ChatContentGroup>
                  <ChatName>
                    Estevão asdsad asd asd asd asd asd asd asd asd as das
                  </ChatName>

                  <ChatTime>Ontem</ChatTime>
                </ChatContentGroup>

                <ChatContentGroup>
                  <ChatMessage>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Facere possimus illo optio inventore cumque magnam quis
                    tenetur, voluptates eligendi soluta obcaecati tempora beatae
                    aspernatur ad dolorum odit nulla numquam fuga.
                  </ChatMessage>

                  <ChatCounter>1</ChatCounter>
                </ChatContentGroup>
              </ChatContent>
            </Chat>
          )}
        />
      </div>
    </ScrollArea>
  )
}
