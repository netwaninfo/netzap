import { Module } from '@nestjs/common'
import { WWJSGroupChatMapper } from './group/wwjs-group-chat-mapper'
import { WWJSGroupContactMapper } from './group/wwjs-group-contact'
import { WWJSPrivateChatMapper } from './private/wwjs-private-chat-mapper'
import { WWJSPrivateContactMapper } from './private/wwjs-private-contact'

@Module({
  providers: [
    WWJSPrivateContactMapper,
    WWJSPrivateChatMapper,
    WWJSGroupContactMapper,
    WWJSGroupChatMapper,
  ],
  exports: [
    WWJSPrivateContactMapper,
    WWJSPrivateChatMapper,
    WWJSGroupContactMapper,
    WWJSGroupChatMapper,
  ],
})
export class WWJSMappersModule {}
