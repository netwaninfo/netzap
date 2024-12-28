import { MimeType } from '@/domain/chat/enterprise/entities/value-objects/mime-type.js'
import { WAMessageMedia } from '@/domain/chat/enterprise/entities/wa/value-objects/message-media.js'
import type { WWJSMessageMedia } from '../../types/wwjs-entities.js'

export class WWJSMessageMediaMapper {
  static toDomain(raw: WWJSMessageMedia): WAMessageMedia {
    return WAMessageMedia.create({
      data: raw.data,
      mimeType: MimeType.create(raw.mimetype),
    })
  }
}
