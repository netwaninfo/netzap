import { Module } from '@nestjs/common'

import { WWJSGroupChatMapper } from './group/wwjs-group-chat-mapper.js'
import { WWJSGroupContactMapper } from './group/wwjs-group-contact-mapper.js'
import { WWJSGroupMessageMapper } from './group/wwjs-group-message-mapper.js'
import { WWJSPrivateChatMapper } from './private/wwjs-private-chat-mapper.js'
import { WWJSPrivateContactMapper } from './private/wwjs-private-contact-mapper.js'
import { WWJSPrivateMessageMapper } from './private/wwjs-private-message-mapper.js'
import { WWJSChatMapper } from './wwjs-chat-mapper.js'
import { WWJSMessageMapper } from './wwjs-message-mapper.js'

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
