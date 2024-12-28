import { Injectable } from '@nestjs/common'

import type { WAMessage } from '@/domain/chat/enterprise/types/wa-message.js'
import type { WWJSMessage } from '../../types/wwjs-entities.js'
import { WWJSClient } from '../../wwjs-client.js'
import { MessageUtils } from '../utils/message.js'
import { WWJSGroupMessageMapper } from './group/wwjs-group-message-mapper.js'
import { WWJSPrivateMessageMapper } from './private/wwjs-private-message-mapper.js'

interface WWJSMessageMapperToDomainParams {
  message: WWJSMessage
  client: WWJSClient
}

@Injectable()
export class WWJSMessageMapper {
  constructor(
    private privateMessageMapper: WWJSPrivateMessageMapper,
    private groupMessageMapper: WWJSGroupMessageMapper
  ) {}

  async toDomain({
    message,
    client,
  }: WWJSMessageMapperToDomainParams): Promise<WAMessage> {
    if (MessageUtils.isGroupMessage(message)) {
      return this.groupMessageMapper.toDomain({ message, client })
    }

    return this.privateMessageMapper.toDomain({ message, client })
  }
}
