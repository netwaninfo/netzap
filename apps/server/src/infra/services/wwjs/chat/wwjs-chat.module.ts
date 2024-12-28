import { Module, forwardRef } from '@nestjs/common'

import { WhatsAppService } from '@/domain/chat/application/services/whats-app-service.js'
import { WWJSModule } from '../wwjs.module.js'
import { WWJSHandlersModule } from './handlers/wwjs-handlers.module.js'
import { WWJSMappersModule } from './mappers/wwjs-mappers.module.js'
import { WWJSChatService } from './wwjs-chat.service.js'

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
