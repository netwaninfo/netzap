import { Input } from '@/components/ui/input'
import { PageContent } from './components/content/page-content'
import { PageHeader } from './components/header/page-header'
import { Chat, ChatContent, ChatFooter } from './components/ui/chat'

export default function Page() {
  return (
    <Chat>
      <PageHeader />

      <ChatContent>
        <PageContent />
      </ChatContent>

      <ChatFooter>
        <Input placeholder="Mensagem" />
      </ChatFooter>
    </Chat>
  )
}
