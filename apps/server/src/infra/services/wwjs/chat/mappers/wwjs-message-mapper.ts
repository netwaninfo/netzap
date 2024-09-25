import { Injectable } from '@nestjs/common'

import { WAMessage } from '@/domain/chat/enterprise/types/wa-message'
import { WWJSMessage } from '../../types/wwjs-entities'
import { WWJSClient } from '../../wwjs-client'
import { MessageUtils } from '../utils/message'
import { WWJSGroupMessageMapper } from './group/wwjs-group-message-mapper'
import { WWJSPrivateMessageMapper } from './private/wwjs-private-message-mapper'

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
