import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  MessageMedia,
  type MessageMediaProps,
} from '@/domain/chat/enterprise/entities/message-media'
import { faker } from '@/test/lib/faker'
import { makeMimeType } from './value-objects/make-mime-type'

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
