import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import {
  PrivateMultiVCardMessage,
  type PrivateMultiVCardMessageProps,
} from '@/domain/chat/enterprise/entities/private/multi-v-card-message.js'
import { makeUniqueEntityID } from '../../make-unique-entity-id.js'
import { makeContact } from '../make-contact.js'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id.js'
import { makeWAMessageID } from '../value-objects/make-wa-message-id.js'

export function makePrivateMultiVCardMessage(
  override: Partial<PrivateMultiVCardMessageProps> = {},
  id?: UniqueEntityID
) {
  return PrivateMultiVCardMessage.create(
    {
      chatId: makeUniqueEntityID(),
      instanceId: makeUniqueEntityID(),
      waChatId: makeWAEntityID(),
      waMessageId: makeWAMessageID(),
      contacts: [makeContact()],
      ...override,
    },
    id
  )
}
