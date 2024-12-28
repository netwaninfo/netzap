import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import {
  PrivateUnknownMessage,
  type PrivateUnknownMessageProps,
} from '@/domain/chat/enterprise/entities/private/unknown-message.js'
import { makeUniqueEntityID } from '../../make-unique-entity-id.js'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id.js'
import { makeWAMessageID } from '../value-objects/make-wa-message-id.js'

export function makePrivateUnknownMessage(
  override: Partial<PrivateUnknownMessageProps> = {},
  id?: UniqueEntityID
) {
  return PrivateUnknownMessage.create(
    {
      chatId: makeUniqueEntityID(),
      instanceId: makeUniqueEntityID(),
      waChatId: makeWAEntityID(),
      waMessageId: makeWAMessageID(),
      payload: {},
      ...override,
    },
    id
  )
}
