import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import {
  PrivateRevokedMessage,
  type PrivateRevokedMessageProps,
} from '@/domain/chat/enterprise/entities/private/revoked-message.js'
import { makeUniqueEntityID } from '../../make-unique-entity-id.js'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id.js'
import { makeWAMessageID } from '../value-objects/make-wa-message-id.js'

export function makePrivateRevokedMessage(
  override: Partial<PrivateRevokedMessageProps> = {},
  id?: UniqueEntityID
) {
  return PrivateRevokedMessage.create(
    {
      chatId: makeUniqueEntityID(),
      instanceId: makeUniqueEntityID(),
      waChatId: makeWAEntityID(),
      waMessageId: makeWAMessageID(),
      ...override,
    },
    id
  )
}
