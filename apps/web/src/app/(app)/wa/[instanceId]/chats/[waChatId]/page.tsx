import { PageContent } from './components/content/page-content'
import { PageFooter } from './components/content/page-footer'
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
        <PageFooter />
      </ChatFooter>
    </Chat>
  )
}
