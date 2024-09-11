import {
  isGroupMessageWithContacts,
  isGroupMessageWithMedia,
} from '@/domain/chat/enterprise/type-guards/message'
import { GroupMessage } from '@/domain/chat/enterprise/types/message'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import { Prisma, Message as PrismaMessage } from '@prisma/client'
import { Except, SetNonNullable, SetRequired } from 'type-fest'
import { Raw as RawContactInstance } from '../prisma-contact-instance-mapper'
import { PrismaGroupAudioMessageMapper } from './audio-message-mapper'
import { PrismaGroupDocumentMessageMapper } from './document-message-mapper'
import { PrismaGroupImageMessageMapper } from './image-message-mapper'
import { PrismaGroupMultiVCardMessageMapper } from './multi-v-card-message-mapper'
import { PrismaGroupRevokedMessageMapper } from './revoked-message-mapper'
import { PrismaGroupTextMessageMapper } from './text-message-mapper'
import { PrismaGroupUnknownMessageMapper } from './unknown-message-mapper'
import { PrismaGroupVCardMessageMapper } from './v-card-message-mapper'
import { PrismaGroupVideoMessageMapper } from './video-message-mapper'
import { PrismaGroupVoiceMessageMapper } from './voice-message-mapper'

export type RawGroupMessage = PrismaMessage & {
  quoted?: Except<RawGroupMessage, 'quoted'> | null
  author: RawContactInstance | null
  contacts: RawContactInstance[]
}

export class PrismaGroupMessageMapper {
  static toDomain(raw: RawGroupMessage): GroupMessage {
    PrismaGroupMessageMapper.isValidRawMessage(raw)

    if (PrismaGroupMessageMapper.isRawMessageWithMedia(raw)) {
      switch (raw.type) {
        case 'audio':
          return PrismaGroupAudioMessageMapper.toDomain(raw)

        case 'document':
          return PrismaGroupDocumentMessageMapper.toDomain(raw)

        case 'image':
          return PrismaGroupImageMessageMapper.toDomain(raw)

        case 'video':
          return PrismaGroupVideoMessageMapper.toDomain(raw)

        case 'voice':
          return PrismaGroupVoiceMessageMapper.toDomain(raw)
      }
    }

    if (PrismaGroupMessageMapper.isRawMessageWithContacts(raw)) {
      switch (raw.type) {
        case 'vcard':
          return PrismaGroupVCardMessageMapper.toDomain(raw)

        case 'multi_vcard':
          return PrismaGroupMultiVCardMessageMapper.toDomain(raw)
      }
    }

    switch (raw.type) {
      case 'revoked':
        return PrismaGroupRevokedMessageMapper.toDomain(raw)

      case 'text':
        return PrismaGroupTextMessageMapper.toDomain(raw)
    }

    return PrismaGroupUnknownMessageMapper.toDomain(raw)
  }

  static toPrisma(message: GroupMessage): Prisma.MessageUncheckedCreateInput {
    if (isGroupMessageWithMedia(message)) {
      switch (message.type) {
        case 'audio':
          return PrismaGroupAudioMessageMapper.toPrisma(message)

        case 'document':
          return PrismaGroupDocumentMessageMapper.toPrisma(message)

        case 'image':
          return PrismaGroupImageMessageMapper.toPrisma(message)

        case 'video':
          return PrismaGroupVideoMessageMapper.toPrisma(message)

        case 'voice':
          return PrismaGroupVoiceMessageMapper.toPrisma(message)
      }
    }

    if (isGroupMessageWithContacts(message)) {
      switch (message.type) {
        case 'vcard':
          return PrismaGroupVCardMessageMapper.toPrisma(message)

        case 'multi_vcard':
          return PrismaGroupMultiVCardMessageMapper.toPrisma(message)
      }
    }

    switch (message.type) {
      case 'revoked':
        return PrismaGroupRevokedMessageMapper.toPrisma(message)

      case 'text':
        return PrismaGroupTextMessageMapper.toPrisma(message)
    }

    return PrismaGroupUnknownMessageMapper.toPrisma(message)
  }

  // Type Guards/Asserts
  private static isValidRawMessage(
    raw: RawGroupMessage
  ): asserts raw is SetNonNullable<RawGroupMessage, 'author'> {
    if (!raw.author) {
      throw new InvalidResourceFormatError({ id: raw.id })
    }
  }

  private static isRawMessageWithMedia(
    raw: RawGroupMessage
  ): raw is SetNonNullable<RawGroupMessage, 'media'> {
    return !!raw.media
  }

  private static isRawMessageWithContacts(
    raw: RawGroupMessage
  ): raw is SetRequired<RawGroupMessage, 'contacts'> {
    return (
      (raw.type === 'multi_vcard' || raw.type === 'vcard') &&
      !!raw.contacts.length
    )
  }
}
