import { WhatsAppService } from '@/domain/chat/application/services/whats-app-service'
import { Module } from '@nestjs/common'
import { WWJSMappersModule } from './mappers/wwjs-mappers.module'
import { WWJSChatService } from './wwjs-chat.service'

@Module({
  imports: [WWJSMappersModule],
  providers: [
    {
      provide: WhatsAppService,
      useClass: WWJSChatService,
    },
  ],
  exports: [WhatsAppService],
})
export class WWJSChatModule {}
