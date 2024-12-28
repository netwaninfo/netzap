import type { WAMessageID } from '@/domain/chat/enterprise/entities/value-objects/wa-message-id.js'
import {
  WAPrivateMessage,
  type WAPrivateMessageProps,
} from '@/domain/chat/enterprise/entities/wa/private/message.js'
import { faker } from '@/test/lib/faker.js'
import { makeUniqueEntityID } from '../../make-unique-entity-id.js'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id.js'
import { makeWAMessageID } from '../value-objects/make-wa-message-id.js'

export const makeWAPrivateMessage = (
  override: Partial<WAPrivateMessageProps> = {},
  id: WAMessageID = makeWAMessageID()
) => {
  return WAPrivateMessage.create(
    {
      ack: 'pending',
      body: faker.lorem.paragraph(),
      waChatId: makeWAEntityID(),
      instanceId: makeUniqueEntityID(),
      isForwarded: faker.datatype.boolean(),
      isFromMe: faker.datatype.boolean(),
      timestamp: Date.now(),
      type: 'text',
      raw: {},
      ...override,
    },
    id
  )
}
