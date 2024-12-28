import type { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id.js'
import {
  WAGroupChat,
  type WAGroupChatProps,
} from '@/domain/chat/enterprise/entities/wa/group/chat.js'
import { faker } from '@/test/lib/faker.js'
import { makeUniqueEntityID } from '../../make-unique-entity-id.js'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id.js'
import { makeWAGroupContact } from './make-wa-group-contact.js'
import { makeWAPrivateContact } from './make-wa-private-contact.js'

export const makeWAGroupChat = (
  override: Partial<WAGroupChatProps> = {},
  id: WAEntityID = makeWAEntityID()
) => {
  const instanceId = makeUniqueEntityID()

  return WAGroupChat.create(
    {
      instanceId,
      name: faker.person.firstName(),
      timestamp: Date.now(),
      unreadCount: faker.number.int({ max: 99 }),
      imageUrl: faker.internet.url(),
      contact: makeWAGroupContact({ instanceId }, id),
      participants: [makeWAPrivateContact({ instanceId })],
      ...override,
    },
    id
  )
}
