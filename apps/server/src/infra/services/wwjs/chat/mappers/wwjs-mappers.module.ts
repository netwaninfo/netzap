import { Module } from '@nestjs/common'
import { WWJSGroupChatMapper } from './group/wwjs-group-chat-mapper'
import { WWJSGroupContactMapper } from './group/wwjs-group-contact-mapper'
import { WWJSGroupMessageMapper } from './group/wwjs-group-message-mapper'
import { WWJSPrivateChatMapper } from './private/wwjs-private-chat-mapper'
import { WWJSPrivateContactMapper } from './private/wwjs-private-contact-mapper'
import { WWJSPrivateMessageMapper } from './private/wwjs-private-message-mapper'
import { WWJSChatMapper } from './wwjs-chat-mapper'
import { WWJSMessageMapper } from './wwjs-message-mapper'

@Module({
  providers: [
    WWJSPrivateContactMapper,
    WWJSGroupContactMapper,
    WWJSPrivateChatMapper,
    WWJSGroupChatMapper,
    WWJSChatMapper,
    WWJSPrivateMessageMapper,
    WWJSGroupMessageMapper,
    WWJSMessageMapper,
  ],
  exports: [WWJSChatMapper, WWJSMessageMapper, WWJSPrivateContactMapper],
})
export class WWJSMappersModule {}
