import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  GroupChat,
  type GroupChatProps,
} from '@/domain/chat/enterprise/entities/group/chat'
import { faker } from '@/test/lib/faker'
import { makeUniqueEntityID } from '../../make-unique-entity-id'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id'

export function makeGroupChat(
  override: Partial<GroupChatProps> = {},
  id?: UniqueEntityID
) {
  return GroupChat.create(
    {
      unreadCount: faker.number.int({ max: 99 }),
      groupId: makeUniqueEntityID(),
      instanceId: makeUniqueEntityID(),
      waChatId: makeWAEntityID({ node: 'g.us' }),
      ...override,
    },
    id
  )
}
