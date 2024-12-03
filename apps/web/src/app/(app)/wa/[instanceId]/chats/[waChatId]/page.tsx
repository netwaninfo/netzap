import { Input } from '@/components/ui/input'
import { PageHeader } from './components/page-header'
import { Chat, ChatContent, ChatFooter } from './components/ui/chat'

export default function Page() {
  return (
    <Chat>
      <PageHeader />

      <ChatContent />

      <ChatFooter>
        <Input placeholder="Mensagem" />
      </ChatFooter>
    </Chat>
  )
}
