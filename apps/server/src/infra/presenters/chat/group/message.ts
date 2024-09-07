import { GroupMessage } from '@/domain/chat/enterprise/types/message'
import { GroupMessage as HttpGroupMessage } from '@netzap/contracts/chat'
import { GroupAudioMessagePresenter } from './audio-message'
import { GroupDocumentMessagePresenter } from './document-message'
import { GroupImageMessagePresenter } from './image-message'
import { GroupMultiVCardMessagePresenter } from './multi-v-card-message'
import { GroupRevokedMessagePresenter } from './revoked-message'
import { GroupTextMessagePresenter } from './text-message'
import { GroupUnknownMessagePresenter } from './unknown-message'
import { GroupVCardMessagePresenter } from './v-card-message'
import { GroupVideoMessagePresenter } from './video-message'
import { GroupVoiceMessagePresenter } from './voice-message'

export class GroupMessagePresenter {
	static toHttp(message: GroupMessage): HttpGroupMessage {
		switch (message.type) {
			case 'audio':
				return GroupAudioMessagePresenter.toHttp(message)

			case 'document':
				return GroupDocumentMessagePresenter.toHttp(message)

			case 'image':
				return GroupImageMessagePresenter.toHttp(message)

			case 'multi_vcard':
				return GroupMultiVCardMessagePresenter.toHttp(message)

			case 'revoked':
				return GroupRevokedMessagePresenter.toHttp(message)

			case 'text':
				return GroupTextMessagePresenter.toHttp(message)

			case 'vcard':
				return GroupVCardMessagePresenter.toHttp(message)

			case 'video':
				return GroupVideoMessagePresenter.toHttp(message)

			case 'voice':
				return GroupVoiceMessagePresenter.toHttp(message)

			default:
				return GroupUnknownMessagePresenter.toHttp(message)
		}
	}
}
