import { Module } from '@nestjs/common'
import { DiscoveryModule } from '@nestjs/core'
import { WWJSChatModule } from './chat/wwjs-chat.module'
import { WWJSManagementModule } from './management/wwjs-management.module'
import { WWJSFactory } from './wwjs-factory.service'
import { WWJSService } from './wwjs.service'

@Module({
  imports: [WWJSManagementModule, WWJSChatModule, DiscoveryModule],
  providers: [
    WWJSFactory,
    {
      provide: WWJSService,
      useExisting: WWJSService,
    },
    WWJSService,
  ],
  exports: [WWJSService, WWJSManagementModule, WWJSChatModule],
})
export class WWJSModule {}
