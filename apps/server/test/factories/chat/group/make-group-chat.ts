import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import {
  GroupChat,
  type GroupChatProps,
} from '@/domain/chat/enterprise/entities/group/chat.js'
import { faker } from '@/test/lib/faker.js'
import { makeUniqueEntityID } from '../../make-unique-entity-id.js'
import { makeGroup } from '../make-group.js'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id.js'

export function makeGroupChat(
  override: Partial<GroupChatProps> = {},
  id?: UniqueEntityID
) {
  const waGroupId = override.waChatId ?? makeWAEntityID({ node: 'g.us' })

  return GroupChat.create(
    {
      unreadCount: faker.number.int({ max: 99 }),
      group: makeGroup({ waGroupId }),
      instanceId: makeUniqueEntityID(),
      waChatId: waGroupId,
      ...override,
    },
    id
  )
}
