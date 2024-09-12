import { Module } from '@nestjs/common'
import { WWJSChatModule } from './chat/wwjs-chat.module'
import { WWJSFactory } from './wwjs-factory.service'
import { WWJSService } from './wwjs.service'

@Module({
  imports: [WWJSChatModule],
  providers: [
    {
      provide: WWJSFactory,
      useExisting: WWJSFactory,
    },
    {
      provide: WWJSService,
      useExisting: WWJSService,
    },
  ],
  exports: [WWJSChatModule],
})
export class WWJSModule {}
