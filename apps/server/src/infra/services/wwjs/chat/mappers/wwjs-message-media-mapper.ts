import { MimeType } from '@/domain/chat/enterprise/entities/value-objects/mime-type'
import { WAMessageMedia } from '@/domain/chat/enterprise/entities/wa/value-objects/message-media'
import { WWJSMessageMedia } from '../../types/wwjs-entities'

export class WWJSMessageMediaMapper {
  static toDomain(raw: WWJSMessageMedia): WAMessageMedia {
    return WAMessageMedia.create({
      data: raw.data,
      mimeType: MimeType.create(raw.mimetype),
    })
  }
}
