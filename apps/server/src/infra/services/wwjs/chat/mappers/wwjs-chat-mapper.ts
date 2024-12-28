import { Injectable } from '@nestjs/common'

import type { WAChat } from '@/domain/chat/enterprise/types/wa-chat.js'
import type { WWJSChat, WWJSGroupChat } from '../../types/wwjs-entities.js'
import { WWJSClient } from '../../wwjs-client.js'
import { ChatUtils } from '../utils/chat.js'
import { WWJSGroupChatMapper } from './group/wwjs-group-chat-mapper.js'
import { WWJSPrivateChatMapper } from './private/wwjs-private-chat-mapper.js'

type WWJSRawChat = WWJSChat | WWJSGroupChat

interface WWJSChatMapperToDomainParams {
  chat: WWJSRawChat
  client: WWJSClient
}

@Injectable()
export class WWJSChatMapper {
  constructor(
    private privateChatMapper: WWJSPrivateChatMapper,
    private groupChatMapper: WWJSGroupChatMapper
  ) {}

  async toDomain({
    chat,
    client,
  }: WWJSChatMapperToDomainParams): Promise<WAChat> {
    if (ChatUtils.isGroupChat(chat)) {
      return this.groupChatMapper.toDomain({ chat, client })
    }

    return this.privateChatMapper.toDomain({ chat, client })
  }
}
