import { faker } from '@/test/lib/faker'

import {
  WAMessageID,
  type WAMessageIDProps,
} from '@/domain/chat/enterprise/entities/value-objects/wa-message-id'
import { makeWAEntityID } from './make-wa-entity-id'

export function makeWAMessageID(override: Partial<WAMessageIDProps> = {}) {
  return WAMessageID.create({
    ref: faker.helpers.fromRegExp(/[0-9]{13}/),
    entityId: makeWAEntityID(),
    isFromMe: faker.datatype.boolean(),
    ...override,
  })
}
