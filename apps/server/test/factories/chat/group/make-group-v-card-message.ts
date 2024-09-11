import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  GroupVCardMessage,
  type GroupVCardMessageProps,
} from '@/domain/chat/enterprise/entities/group/v-card-message'
import { makeUniqueEntityID } from '../../make-unique-entity-id'
import { makeContact } from '../make-contact'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id'
import { makeWAMessageID } from '../value-objects/make-wa-message-id'

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
