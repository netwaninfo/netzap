import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import {
  GroupVCardMessage,
  type GroupVCardMessageProps,
} from '@/domain/chat/enterprise/entities/group/v-card-message.js'
import { makeUniqueEntityID } from '../../make-unique-entity-id.js'
import { makeContact } from '../make-contact.js'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id.js'
import { makeWAMessageID } from '../value-objects/make-wa-message-id.js'

export function makeGroupVCardMessage(
  override: Partial<GroupVCardMessageProps> = {},
  id?: UniqueEntityID
) {
  return GroupVCardMessage.create(
    {
      chatId: makeUniqueEntityID(),
      instanceId: makeUniqueEntityID(),
      waChatId: makeWAEntityID(),
      waMessageId: makeWAMessageID(),
      contact: makeContact(),
      author: makeContact(),
      ...override,
    },
    id
  )
}
