import { Rocket } from 'lucide-react'

import { Code, H3, Paragraph } from '@/components/custom/typography'
import { Badge } from '@/components/ui/badge'

export default function ChatsPage() {
  return (
    <div className="flex items-center justify-center h-full relative">
      <header className="space-y-2 text-center">
        <H3>Bem vindo ao NetZap</H3>

        <div className="text-muted-foreground">
          <Paragraph>
            Use uma única conta do{' '}
            <Code className="text-emerald-600">WhatsApp</Code> com várias
            pessoas. <br />
          </Paragraph>

          <Paragraph>Selecione uma conversa ao lado para iniciar.</Paragraph>
        </div>
      </header>

      <footer className="absolute bottom-8">
        <Badge className="px-4 py-2 uppercase select-none">
          <Rocket className="size-4 mr-2" />
          Em construção
        </Badge>
      </footer>
    </div>
  )
}
