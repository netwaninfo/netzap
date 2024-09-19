import { Module } from '@nestjs/common'
import { WWJSChatModule } from './chat/wwjs-chat.module'
import { WWJSManagementModule } from './management/wwjs-management.module'
import { WWJSFactory } from './wwjs-factory.service'
import { WWJSService } from './wwjs.service'

@Module({
  imports: [WWJSManagementModule, WWJSChatModule],
  providers: [
    {
      provide: WWJSFactory,
      useExisting: WWJSFactory,
    },
    WWJSFactory,
    {
      provide: WWJSService,
      useExisting: WWJSService,
    },
    WWJSService,
  ],
  exports: [WWJSFactory, WWJSService, WWJSManagementModule, WWJSChatModule],
})
export class WWJSModule {}
