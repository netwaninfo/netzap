import { PrivateMultiVCardMessage } from '@/domain/chat/enterprise/entities/private/multi-v-card-message'
import { PrivateMultiVCardMessage as HttpPrivateMultiVCardMessage } from '@netzap/contracts/chat'
import { ContactPresenter } from '../contact-presenter'
import { PrivateQuotedMessagePresenter } from './quoted-message'

export class PrivateMultiVCardMessagePresenter {
	static toHttp(
		message: PrivateMultiVCardMessage,
	): HttpPrivateMultiVCardMessage {
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
			contacts: message.contacts.map(ContactPresenter.toHttp),
		}
	}
}
