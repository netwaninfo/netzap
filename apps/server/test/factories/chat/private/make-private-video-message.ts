import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  PrivateVideoMessage,
  type PrivateVideoMessageProps,
} from '@/domain/chat/enterprise/entities/private/video-message'
import { makeUniqueEntityID } from '../../make-unique-entity-id'
import { makeMessageMedia } from '../make-message-media'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id'
import { makeWAMessageID } from '../value-objects/make-wa-message-id'

export function makePrivateVideoMessage(
  override: Partial<PrivateVideoMessageProps> = {},
  id?: UniqueEntityID
) {
  return PrivateVideoMessage.create(
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
