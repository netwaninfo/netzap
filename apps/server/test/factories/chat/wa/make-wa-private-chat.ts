import type { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import {
  WAPrivateChat,
  type WAPrivateChatProps,
} from '@/domain/chat/enterprise/entities/wa/private/chat'
import { faker } from '@/test/lib/faker'
import { makeUniqueEntityID } from '../../make-unique-entity-id'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id'
import { makeWAPrivateContact } from './make-wa-private-contact'

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
