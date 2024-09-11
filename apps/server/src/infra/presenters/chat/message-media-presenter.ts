import { MessageMedia } from '@/domain/chat/enterprise/entities/message-media'
import { MessageMedia as HttpMessageMedia } from '@netzap/contracts/chat'

export class MessageMediaPresenter {
  static toHttp(media: MessageMedia): HttpMessageMedia {
    return {
      id: media.id.toString(),
      key: media.key,
      mimeType: media.mimeType.toString(),
      url: media.url,
    }
  }
}
