import { PrivateMessage } from '@/domain/chat/enterprise/types/message'
import { PrivateMessage as HttpPrivateMessage } from '@netzap/contracts/chat'
import { PrivateAudioMessagePresenter } from './audio-message'
import { PrivateDocumentMessagePresenter } from './document-message'
import { PrivateImageMessagePresenter } from './image-message'
import { PrivateMultiVCardMessagePresenter } from './multi-v-card-message'
import { PrivateRevokedMessagePresenter } from './revoked-message'
import { PrivateTextMessagePresenter } from './text-message'
import { PrivateUnknownMessagePresenter } from './unknown-message'
import { PrivateVCardMessagePresenter } from './v-card-message'
import { PrivateVideoMessagePresenter } from './video-message'
import { PrivateVoiceMessagePresenter } from './voice-message'

export class PrivateMessagePresenter {
	static toHttp(message: PrivateMessage): HttpPrivateMessage {
		switch (message.type) {
			case 'audio':
				return PrivateAudioMessagePresenter.toHttp(message)

			case 'document':
				return PrivateDocumentMessagePresenter.toHttp(message)

			case 'image':
				return PrivateImageMessagePresenter.toHttp(message)

			case 'multi_vcard':
				return PrivateMultiVCardMessagePresenter.toHttp(message)

			case 'revoked':
				return PrivateRevokedMessagePresenter.toHttp(message)

			case 'text':
				return PrivateTextMessagePresenter.toHttp(message)

			case 'vcard':
				return PrivateVCardMessagePresenter.toHttp(message)

			case 'video':
				return PrivateVideoMessagePresenter.toHttp(message)

			case 'voice':
				return PrivateVoiceMessagePresenter.toHttp(message)

			default:
				return PrivateUnknownMessagePresenter.toHttp(message)
		}
	}
}
