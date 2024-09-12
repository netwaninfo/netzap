import { Injectable } from '@nestjs/common'
import { Chat, GroupChat } from 'whatsapp-web.js'

import { WWJSClient } from '../../wwjs-client'
import { WWJSGroupChatMapper } from './group/wwjs-group-chat-mapper'
import { WWJSPrivateChatMapper } from './private/wwjs-private-chat-mapper'

type WWJSChat = Chat | GroupChat

interface WWJSChatMapperToDomainParams {
  chat: WWJSChat
  client: WWJSClient
}

@Injectable()
export class WWJSChatMapper {
  constructor(
    private privateChatMapper: WWJSPrivateChatMapper,
    private groupChatMapper: WWJSGroupChatMapper
  ) {}

  private isGroupChat(chat: WWJSChat): chat is GroupChat {
    return chat.isGroup
  }

  async toDomain({ chat, client }: WWJSChatMapperToDomainParams) {
    if (this.isGroupChat(chat)) {
      return this.groupChatMapper.toDomain({ chat, client })
    }

    return this.privateChatMapper.toDomain({ chat, client })
  }
}
