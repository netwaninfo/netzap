import {
  ChatPage,
  ChatPageContent,
  ChatPageFooter,
} from './components/chat-page'

import { PageContent } from './components/content/page-content'
import { PageFooter } from './components/footer/page-footer'
import { PageHeader } from './components/header/page-header'

export default function ChatItemPage() {
  return (
    <ChatPage>
      <PageHeader />

      <ChatPageContent>
        <PageContent />
      </ChatPageContent>

      <ChatPageFooter>
        <PageFooter />
      </ChatPageFooter>
    </ChatPage>
  )
}
