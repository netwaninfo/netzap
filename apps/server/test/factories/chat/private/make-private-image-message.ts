import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  PrivateImageMessage,
  type PrivateImageMessageProps,
} from '@/domain/chat/enterprise/entities/private/image-message'
import { makeUniqueEntityID } from '../../make-unique-entity-id'
import { makeMessageMedia } from '../make-message-media'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id'
import { makeWAMessageID } from '../value-objects/make-wa-message-id'

export function makePrivateImageMessage(
  override: Partial<PrivateImageMessageProps> = {},
  id?: UniqueEntityID
) {
  return PrivateImageMessage.create(
    {
      chatId: makeUniqueEntityID(),
      instanceId: makeUniqueEntityID(),
      waChatId: makeWAEntityID(),
      waMessageId: makeWAMessageID(),
      media: makeMessageMedia(),
      ...override,
    },
    id
  )
}
