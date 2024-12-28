import type { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id.js'
import {
  WAPrivateChat,
  type WAPrivateChatProps,
} from '@/domain/chat/enterprise/entities/wa/private/chat.js'
import { faker } from '@/test/lib/faker.js'
import { makeUniqueEntityID } from '../../make-unique-entity-id.js'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id.js'
import { makeWAPrivateContact } from './make-wa-private-contact.js'

export const makeWAPrivateChat = (
  override: Partial<WAPrivateChatProps> = {},
  id: WAEntityID = makeWAEntityID()
) => {
  const instanceId = makeUniqueEntityID()

  return WAPrivateChat.create(
    {
      instanceId,
      name: faker.person.firstName(),
      timestamp: Date.now(),
      unreadCount: faker.number.int({ max: 99 }),
      imageUrl: faker.internet.url(),
      contact: makeWAPrivateContact({ instanceId }, id),
      ...override,
    },
    id
  )
}
