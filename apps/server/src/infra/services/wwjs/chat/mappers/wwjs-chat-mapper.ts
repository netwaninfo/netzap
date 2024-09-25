import { Injectable } from '@nestjs/common'

import { WAChat } from '@/domain/chat/enterprise/types/wa-chat'
import { WWJSChat, WWJSGroupChat } from '../../types/wwjs-entities'
import { WWJSClient } from '../../wwjs-client'
import { ChatUtils } from '../utils/chat'
import { WWJSGroupChatMapper } from './group/wwjs-group-chat-mapper'
import { WWJSPrivateChatMapper } from './private/wwjs-private-chat-mapper'

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
