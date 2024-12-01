import { Paragraph } from '@/components/custom/typography'
import { Input } from '@/components/ui/input'
import {
  ChatAvatar,
  ChatAvatarFallback,
  ChatAvatarImage,
} from '../components/ui/chat'

export default function Page({ ...props }: unknown) {
  return (
    <div className="flex flex-col w-full h-full">
      <header className="px-4 py-2.5 border-b h-16 flex items-center">
        <div className="flex items-center space-x-2">
          <ChatAvatar className="size-10">
            <ChatAvatarImage src="https://github.com/tevass.png" />
            <ChatAvatarFallback>EG</ChatAvatarFallback>
          </ChatAvatar>

          <Paragraph className="font-medium">Estevão (Eu)</Paragraph>
        </div>
      </header>

      <section className="flex-1 bg-accent" />

      <footer className="border-t p-4">
        <Input placeholder="Mensagem" />
      </footer>
    </div>
  )
}
