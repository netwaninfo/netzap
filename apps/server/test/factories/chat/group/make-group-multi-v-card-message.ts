import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import {
  GroupMultiVCardMessage,
  type GroupMultiVCardMessageProps,
} from '@/domain/chat/enterprise/entities/group/multi-v-card-message.js'
import { makeUniqueEntityID } from '../../make-unique-entity-id.js'
import { makeContact } from '../make-contact.js'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id.js'
import { makeWAMessageID } from '../value-objects/make-wa-message-id.js'

export function makeGroupMultiVCardMessage(
  override: Partial<GroupMultiVCardMessageProps> = {},
  id?: UniqueEntityID
) {
  return GroupMultiVCardMessage.create(
    {
      chatId: makeUniqueEntityID(),
      instanceId: makeUniqueEntityID(),
      waChatId: makeWAEntityID(),
      waMessageId: makeWAMessageID(),
      contacts: [makeContact()],
      author: makeContact(),
      ...override,
    },
    id
  )
}
