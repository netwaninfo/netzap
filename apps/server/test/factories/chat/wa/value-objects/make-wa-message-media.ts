import {
  WAMessageMedia,
  type WAMessageMediaProps,
} from '@/domain/chat/enterprise/entities/wa/value-objects/message-media'
import { faker } from '@faker-js/faker'
import { makeMimeType } from '../../value-objects/make-mime-type'

export function makeWAMessageMedia(override?: Partial<WAMessageMediaProps>) {
  return WAMessageMedia.create({
    data: faker.lorem.paragraph(),
    mimeType: makeMimeType(),
    ...override,
  })
}
