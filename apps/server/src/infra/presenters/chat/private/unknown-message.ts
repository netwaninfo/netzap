import { PrivateUnknownMessage } from '@/domain/chat/enterprise/entities/private/unknown-message'
import { PrivateUnknownMessage as HttpPrivateUnknownMessage } from '@netzap/contracts/chat'
import { PrivateQuotedMessagePresenter } from './quoted-message'

export class PrivateUnknownMessagePresenter {
	static toHttp(message: PrivateUnknownMessage): HttpPrivateUnknownMessage {
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
		}
	}
}
