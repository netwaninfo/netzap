import {
  WAMessageMedia,
  type WAMessageMediaProps,
} from '@/domain/chat/enterprise/entities/wa/value-objects/message-media.js'
import { faker } from '@/test/lib/faker.js'
import { makeMimeType } from '../../value-objects/make-mime-type.js'

export function makeWAMessageMedia(override?: Partial<WAMessageMediaProps>) {
  return WAMessageMedia.create({
    data: faker.lorem.paragraph(),
    mimeType: makeMimeType(),
    ...override,
  })
}
