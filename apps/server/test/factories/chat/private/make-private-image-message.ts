import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import {
  PrivateImageMessage,
  type PrivateImageMessageProps,
} from '@/domain/chat/enterprise/entities/private/image-message.js'
import { makeUniqueEntityID } from '../../make-unique-entity-id.js'
import { makeMessageMedia } from '../make-message-media.js'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id.js'
import { makeWAMessageID } from '../value-objects/make-wa-message-id.js'

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
