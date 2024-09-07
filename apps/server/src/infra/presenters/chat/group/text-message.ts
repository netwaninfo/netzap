import { GroupTextMessage } from '@/domain/chat/enterprise/entities/group/text-message'
import { GroupTextMessage as HttpGroupTextMessage } from '@netzap/contracts/chat'
import { ContactPresenter } from '../contact-presenter'
import { GroupQuotedMessagePresenter } from './quoted-message'

export class GroupTextMessagePresenter {
	static toHttp(message: GroupTextMessage): HttpGroupTextMessage {
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
			body: message.body,
			quoted: message.hasQuoted()
				? GroupQuotedMessagePresenter.toHttp(message.quoted)
				: null,
		}
	}
}
