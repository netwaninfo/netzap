import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import {
  PrivateVCardMessage,
  type PrivateVCardMessageProps,
} from '@/domain/chat/enterprise/entities/private/v-card-message.js'
import { makeUniqueEntityID } from '../../make-unique-entity-id.js'
import { makeContact } from '../make-contact.js'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id.js'
import { makeWAMessageID } from '../value-objects/make-wa-message-id.js'

export function makePrivateVCardMessage(
  override: Partial<PrivateVCardMessageProps> = {},
  id?: UniqueEntityID
) {
  return PrivateVCardMessage.create(
    {
      chatId: makeUniqueEntityID(),
      instanceId: makeUniqueEntityID(),
      waChatId: makeWAEntityID(),
      waMessageId: makeWAMessageID(),
      contact: makeContact(),
      ...override,
    },
    id
  )
}
