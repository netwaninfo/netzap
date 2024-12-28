import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import {
  PrivateChat,
  type PrivateChatProps,
} from '@/domain/chat/enterprise/entities/private/chat.js'
import { faker } from '@/test/lib/faker.js'
import { makeUniqueEntityID } from '../../make-unique-entity-id.js'
import { makeContact } from '../make-contact.js'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id.js'

export function makePrivateChat(
  override: Partial<PrivateChatProps> = {},
  id?: UniqueEntityID
) {
  const waContactId = override.waChatId ?? makeWAEntityID({ node: 'c.us' })

  return PrivateChat.create(
    {
      unreadCount: faker.number.int({ max: 99 }),
      contact: makeContact({ waContactId }),
      instanceId: makeUniqueEntityID(),
      waChatId: waContactId,
      ...override,
    },
    id
  )
}
