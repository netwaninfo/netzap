import { PrivateRevokedMessage } from '@/domain/chat/enterprise/entities/private/revoked-message'
import {
  isPrivateMessageWithContacts,
  isPrivateMessageWithMedia,
} from '@/domain/chat/enterprise/type-guards/message'
import { PrivateMessage } from '@/domain/chat/enterprise/types/message'
import { Prisma, Message as PrismaMessage } from '@prisma/client'
import { Except, SetNonNullable, SetRequired } from 'type-fest'
import { Raw as RawContactInstance } from '../prisma-contact-instance-mapper'
import { PrismaPrivateAudioMessageMapper } from './audio-message-mapper'
import { PrismaPrivateDocumentMessageMapper } from './document-message-mapper'
import { PrismaPrivateImageMessageMapper } from './image-message-mapper'
import { PrismaPrivateMultiVCardMessageMapper } from './multi-v-card-message-mapper'
import { PrismaPrivateRevokedMessageMapper } from './revoked-message-mapper'
import { PrismaPrivateTextMessageMapper } from './text-message-mapper'
import { PrismaPrivateUnknownMessageMapper } from './unknown-message-mapper'
import { PrismaPrivateVCardMessageMapper } from './v-card-message-mapper'
import { PrismaPrivateVideoMessageMapper } from './video-message-mapper'
import { PrismaPrivateVoiceMessageMapper } from './voice-message-mapper'

export type RawPrivateMessage = PrismaMessage & {
  quoted?: Except<RawPrivateMessage, 'quoted'> | null
  contacts: RawContactInstance[]
}

export class PrismaPrivateMessageMapper {
  static toDomain(raw: RawPrivateMessage): PrivateMessage {
    if (PrismaPrivateMessageMapper.isRawMessageWithMedia(raw)) {
      switch (raw.type) {
        case 'audio':
          return PrismaPrivateAudioMessageMapper.toDomain(raw)

        case 'document':
          return PrismaPrivateDocumentMessageMapper.toDomain(raw)

        case 'image':
          return PrismaPrivateImageMessageMapper.toDomain(raw)

        case 'video':
          return PrismaPrivateVideoMessageMapper.toDomain(raw)

        case 'voice':
          return PrismaPrivateVoiceMessageMapper.toDomain(raw)
      }
    }

    if (PrismaPrivateMessageMapper.isRawMessageWithContacts(raw)) {
      switch (raw.type) {
        case 'vcard':
          return PrismaPrivateVCardMessageMapper.toDomain(raw)

        case 'multi_vcard':
          return PrismaPrivateMultiVCardMessageMapper.toDomain(raw)
      }
    }

    switch (raw.type) {
      case 'revoked':
        return PrismaPrivateRevokedMessageMapper.toDomain(raw)

      case 'text':
        return PrismaPrivateTextMessageMapper.toDomain(raw)
    }

    return PrismaPrivateUnknownMessageMapper.toDomain(raw)
  }

  static toPrismaCreate(
    message: PrivateMessage
  ): Prisma.MessageUncheckedCreateInput {
    if (isPrivateMessageWithMedia(message)) {
      switch (message.type) {
        case 'audio':
          return PrismaPrivateAudioMessageMapper.toPrismaCreate(message)

        case 'document':
          return PrismaPrivateDocumentMessageMapper.toPrismaCreate(message)

        case 'image':
          return PrismaPrivateImageMessageMapper.toPrismaCreate(message)

        case 'video':
          return PrismaPrivateVideoMessageMapper.toPrismaCreate(message)

        case 'voice':
          return PrismaPrivateVoiceMessageMapper.toPrismaCreate(message)
      }
    }

    if (isPrivateMessageWithContacts(message)) {
      switch (message.type) {
        case 'vcard':
          return PrismaPrivateVCardMessageMapper.toPrismaCreate(message)

        case 'multi_vcard':
          return PrismaPrivateMultiVCardMessageMapper.toPrismaCreate(message)
      }
    }

    switch (message.type) {
      case 'revoked':
        return PrismaPrivateRevokedMessageMapper.toPrismaCreate(message)

      case 'text':
        return PrismaPrivateTextMessageMapper.toPrismaCreate(message)
    }

    return PrismaPrivateUnknownMessageMapper.toPrismaCreate(message)
  }

  static toPrismaSetStatus(
    message: PrivateMessage
  ): Prisma.MessageUncheckedUpdateInput {
    if (isPrivateMessageWithMedia(message)) {
      switch (message.type) {
        case 'audio':
          return PrismaPrivateAudioMessageMapper.toPrismaSetStatus(message)

        case 'document':
          return PrismaPrivateDocumentMessageMapper.toPrismaSetStatus(message)

        case 'image':
          return PrismaPrivateImageMessageMapper.toPrismaSetStatus(message)

        case 'video':
          return PrismaPrivateVideoMessageMapper.toPrismaSetStatus(message)

        case 'voice':
          return PrismaPrivateVoiceMessageMapper.toPrismaSetStatus(message)
      }
    }

    if (isPrivateMessageWithContacts(message)) {
      switch (message.type) {
        case 'vcard':
          return PrismaPrivateVCardMessageMapper.toPrismaSetStatus(message)

        case 'multi_vcard':
          return PrismaPrivateMultiVCardMessageMapper.toPrismaSetStatus(message)
      }
    }

    switch (message.type) {
      case 'revoked':
        return PrismaPrivateRevokedMessageMapper.toPrismaSetStatus(message)

      case 'text':
        return PrismaPrivateTextMessageMapper.toPrismaSetStatus(message)
    }

    return PrismaPrivateUnknownMessageMapper.toPrismaSetStatus(message)
  }

  static toPrismaSetRevoked(message: PrivateRevokedMessage) {
    return PrismaPrivateRevokedMessageMapper.toPrismaSetRevoked(message)
  }

  // Type Guards/Asserts
  private static isRawMessageWithMedia(
    raw: RawPrivateMessage
  ): raw is SetNonNullable<RawPrivateMessage, 'media'> {
    return !!raw.media
  }

  private static isRawMessageWithContacts(
    raw: RawPrivateMessage
  ): raw is SetRequired<RawPrivateMessage, 'contacts'> {
    return (
      (raw.type === 'multi_vcard' || raw.type === 'vcard') &&
      !!raw.contacts.length
    )
  }
}
