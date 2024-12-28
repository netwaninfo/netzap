import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import {
  MessageMedia,
  type MessageMediaProps,
} from '@/domain/chat/enterprise/entities/message-media.js'
import { faker } from '@/test/lib/faker.js'
import { makeMimeType } from './value-objects/make-mime-type.js'

export const makeMessageMedia = (
  override: Partial<MessageMediaProps> = {},
  id?: UniqueEntityID
) => {
  return MessageMedia.create(
    {
      key: faker.string.uuid(),
      mimeType: makeMimeType(),
      url: faker.image.url(),
      ...override,
    },
    id
  )
}
