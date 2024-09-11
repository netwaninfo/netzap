import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  PrivateChat,
  type PrivateChatProps,
} from '@/domain/chat/enterprise/entities/private/chat'
import { faker } from '@/test/lib/faker'
import { makeUniqueEntityID } from '../../make-unique-entity-id'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id'

export function makePrivateChat(
  override: Partial<PrivateChatProps> = {},
  id?: UniqueEntityID
) {
  return PrivateChat.create(
    {
      unreadCount: faker.number.int({ max: 99 }),
      contactId: makeUniqueEntityID(),
      instanceId: makeUniqueEntityID(),
      waChatId: makeWAEntityID({ node: 'c.us' }),
      ...override,
    },
    id
  )
}
