import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import {
  PrivateTextMessage,
  type PrivateTextMessageProps,
} from '@/domain/chat/enterprise/entities/private/text-message.js'
import { faker } from '@/test/lib/faker.js'
import { makeUniqueEntityID } from '../../make-unique-entity-id.js'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id.js'
import { makeWAMessageID } from '../value-objects/make-wa-message-id.js'

export function makePrivateTextMessage(
  override: Partial<PrivateTextMessageProps> = {},
  id?: UniqueEntityID
) {
  return PrivateTextMessage.create(
    {
      chatId: makeUniqueEntityID(),
      instanceId: makeUniqueEntityID(),
      waChatId: makeWAEntityID(),
      waMessageId: makeWAMessageID(),
      body: faker.lorem.paragraph(),
      ...override,
    },
    id
  )
}
