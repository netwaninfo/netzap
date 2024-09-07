import { GroupUnknownMessage } from '@/domain/chat/enterprise/entities/group/unknown-message'
import { GroupUnknownMessage as HttpGroupUnknownMessage } from '@netzap/contracts/chat'
import { ContactPresenter } from '../contact-presenter'
import { GroupQuotedMessagePresenter } from './quoted-message'

export class GroupUnknownMessagePresenter {
	static toHttp(message: GroupUnknownMessage): HttpGroupUnknownMessage {
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
			author: ContactPresenter.toHttp(message.author),
			sentBy: message.sentBy?.toString() ?? null,
			quoted: message.hasQuoted()
				? GroupQuotedMessagePresenter.toHttp(message.quoted)
				: null,
		}
	}
}
