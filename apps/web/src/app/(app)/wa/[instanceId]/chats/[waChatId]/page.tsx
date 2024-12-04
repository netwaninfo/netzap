import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageBody } from '../components/ui/message'
import { PageHeader } from './components/page-header'
import {
  Chat,
  ChatContent,
  ChatContentWrapper,
  ChatFooter,
} from './components/ui/chat'
import {
  Group,
  GroupContent,
  GroupDate,
  GroupHeader,
} from './components/ui/group'
import {
  MessageReceived,
  MessageReceivedContent,
  MessageReceivedDate,
} from './components/ui/message-received'
import {
  MessageSent,
  MessageSentContent,
  MessageSentDate,
} from './components/ui/message-sent'

export default function Page() {
  return (
    <Chat>
      <PageHeader />

      <ChatContent>
        <ScrollArea className="h-full">
          <ChatContentWrapper>
            {Array.from(Array(10)).map((_, i) => (
              <Group key={i}>
                <GroupHeader>
                  <GroupDate>Hoje {1 + i}</GroupDate>
                </GroupHeader>

                <GroupContent>
                  {Array.from(Array(5)).map((_, i) =>
                    i % 2 === 0 ? (
                      <MessageReceived key={i}>
                        <MessageReceivedContent>
                          <MessageBody>Hey, how's it going?</MessageBody>

                          <MessageReceivedDate>10:35 PM</MessageReceivedDate>
                        </MessageReceivedContent>
                      </MessageReceived>
                    ) : (
                      <MessageSent key={i}>
                        <MessageSentContent>
                          <MessageBody>
                            Not bad, just working on a new project. You?
                          </MessageBody>

                          <MessageSentDate>10:36 PM</MessageSentDate>
                        </MessageSentContent>
                      </MessageSent>
                    )
                  )}
                </GroupContent>
              </Group>
            ))}
          </ChatContentWrapper>
        </ScrollArea>
      </ChatContent>

      <ChatFooter>
        <Input placeholder="Mensagem" />
      </ChatFooter>
    </Chat>
  )
}
