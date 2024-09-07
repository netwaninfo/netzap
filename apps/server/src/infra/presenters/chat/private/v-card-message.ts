import { PrivateVCardMessage } from '@/domain/chat/enterprise/entities/private/v-card-message'
import { PrivateVCardMessage as HttpPrivateVCardMessage } from '@netzap/contracts/chat'
import { ContactPresenter } from '../contact-presenter'
import { PrivateQuotedMessagePresenter } from './quoted-message'

export class PrivateVCardMessagePresenter {
	static toHttp(message: PrivateVCardMessage): HttpPrivateVCardMessage {
		return {
			id: message.id.toString(),
			chatId: message.chatId.toString(),
			waChatId: message.waChatId.toString(),
			instanceId: message.instanceId.toString(),
			waMessageId: message.waMessageId.toString(),
			type: message.type,
			status: message.status,
			isForwarded: message.isForwarded,
			isFromMe: message.isFromMe,
			createdAt: message.createdAt,
			sentBy: message.sentBy?.toString() ?? null,
			quoted: message.hasQuoted()
				? PrivateQuotedMessagePresenter.toHttp(message.quoted)
				: null,
			contact: ContactPresenter.toHttp(message.contact),
		}
	}
}
