import { WhatsAppService } from '@/domain/chat/application/services/whats-app-service'
import { Module, forwardRef } from '@nestjs/common'
import { WWJSModule } from '../wwjs.module'
import { WWJSMappersModule } from './mappers/wwjs-mappers.module'
import { WWJSChatService } from './wwjs-chat.service'

@Module({
  imports: [forwardRef(() => WWJSModule), WWJSMappersModule],
  providers: [
    {
      provide: WhatsAppService,
      useClass: WWJSChatService,
    },
  ],
  exports: [WhatsAppService],
})
export class WWJSChatModule {}
