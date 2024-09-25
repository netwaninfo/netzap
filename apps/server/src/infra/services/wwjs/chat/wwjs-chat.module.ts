import { Module, forwardRef } from '@nestjs/common'

import { WhatsAppService } from '@/domain/chat/application/services/whats-app-service'
import { WWJSModule } from '../wwjs.module'
import { WWJSHandlersModule } from './handlers/wwjs-handlers.module'
import { WWJSMappersModule } from './mappers/wwjs-mappers.module'
import { WWJSChatService } from './wwjs-chat.service'

@Module({
  imports: [
    forwardRef(() => WWJSModule),
    WWJSMappersModule,
    WWJSHandlersModule,
  ],
  providers: [
    {
      provide: WhatsAppService,
      useClass: WWJSChatService,
    },
  ],
  exports: [WhatsAppService],
})
export class WWJSChatModule {}
