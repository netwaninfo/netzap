import { GroupMultiVCardMessage } from '@/domain/chat/enterprise/entities/group/multi-v-card-message'
import { GroupQuotedMultiVCardMessage } from '@netzap/contracts/chat'
import { Except } from 'type-fest'
import { ContactPresenter } from '../contact-presenter'

export class GroupQuotedMultiVCardMessagePresenter {
	static toHttp(
		message: Except<GroupMultiVCardMessage, 'quoted'>,
	): GroupQuotedMultiVCardMessage {
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
			contacts: message.contacts.map(ContactPresenter.toHttp),
		}
	}
}
