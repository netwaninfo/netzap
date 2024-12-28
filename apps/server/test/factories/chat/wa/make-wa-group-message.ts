import type { WAMessageID } from '@/domain/chat/enterprise/entities/value-objects/wa-message-id.js'
import {
  WAGroupMessage,
  type WAGroupMessageProps,
} from '@/domain/chat/enterprise/entities/wa/group/message.js'
import { faker } from '@/test/lib/faker.js'
import { makeUniqueEntityID } from '../../make-unique-entity-id.js'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id.js'
import { makeWAMessageID } from '../value-objects/make-wa-message-id.js'
import { makeWAPrivateContact } from './make-wa-private-contact.js'

export const makeWAGroupMessage = (
  override: Partial<WAGroupMessageProps> = {},
  id: WAMessageID = makeWAMessageID()
) => {
  const instanceId = makeUniqueEntityID()

  return WAGroupMessage.create(
    {
      instanceId,
      ack: 'pending',
      body: faker.lorem.paragraph(),
      waChatId: makeWAEntityID(),
      isForwarded: faker.datatype.boolean(),
      isFromMe: faker.datatype.boolean(),
      timestamp: Date.now(),
      type: 'text',
      author: makeWAPrivateContact({ instanceId }),
      raw: {},
      ...override,
    },
    id
  )
}
