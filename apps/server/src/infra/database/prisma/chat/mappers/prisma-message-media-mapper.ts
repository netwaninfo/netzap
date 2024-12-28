import { Prisma, type MessageMedia as PrismaMessageMedia } from '@prisma/client'

import { MessageMedia } from '@/domain/chat/enterprise/entities/message-media.js'
import { MimeType } from '@/domain/chat/enterprise/entities/value-objects/mime-type.js'

type Raw = PrismaMessageMedia

export class PrismaMessageMediaMapper {
  static toDomain(raw: Raw): MessageMedia {
    return MessageMedia.create({
      key: raw.key,
      mimeType: MimeType.create(raw.mimeType),
      url: raw.url,
    })
  }

  static toPrismaCreate(media: MessageMedia): Prisma.MessageMediaCreateInput {
    return {
      key: media.key,
      mimeType: media.mimeType.extension(),
      url: media.url,
    }
  }

  static toPrismaUpdate(media: MessageMedia): Prisma.MessageMediaUpdateInput {
    return {
      key: media.key,
      mimeType: media.mimeType.extension(),
      url: media.url,
    }
  }
}
