import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import {
  GroupTextMessage,
  type GroupTextMessageProps,
} from '@/domain/chat/enterprise/entities/group/text-message.js'
import { faker } from '@/test/lib/faker.js'
import { makeUniqueEntityID } from '../../make-unique-entity-id.js'
import { makeContact } from '../make-contact.js'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id.js'
import { makeWAMessageID } from '../value-objects/make-wa-message-id.js'

export function makeGroupTextMessage(
  override: Partial<GroupTextMessageProps> = {},
  id?: UniqueEntityID
) {
  return GroupTextMessage.create(
    {
      chatId: makeUniqueEntityID(),
      instanceId: makeUniqueEntityID(),
      waChatId: makeWAEntityID(),
      waMessageId: makeWAMessageID(),
      body: faker.lorem.paragraph(),
      author: makeContact(),
      ...override,
    },
    id
  )
}
