import { MessageMedia } from '@/domain/chat/enterprise/entities/message-media'
import { MessageMedia as Output } from '@netzap/entities/chat'

export class MessageMediaPresenter {
  static toOutput(media: MessageMedia): Output {
    return {
      id: media.id.toString(),
      key: media.key,
      mimeType: media.mimeType.toString(),
      url: media.url,
    }
  }
}
