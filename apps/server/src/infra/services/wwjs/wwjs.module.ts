import { Module } from '@nestjs/common'

import { UtilitiesModule } from '../utilities/utilities.module.js'
import { WWJSChatModule } from './chat/wwjs-chat.module.js'
import { WWJSManagementModule } from './management/wwjs-management.module.js'
import { WWJSFactory } from './wwjs-factory.service.js'
import { WWJSService } from './wwjs.service.js'

@Module({
  imports: [UtilitiesModule, WWJSManagementModule, WWJSChatModule],
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
