import { GroupDocumentMessage } from '@/domain/chat/enterprise/entities/group/document-message'
import { GroupDocumentMessage as HttpGroupDocumentMessage } from '@netzap/contracts/chat'
import { ContactPresenter } from '../contact-presenter'
import { MessageMediaPresenter } from '../message-media-presenter'
import { GroupQuotedMessagePresenter } from './quoted-message'

export class GroupDocumentMessagePresenter {
	static toHttp(message: GroupDocumentMessage): HttpGroupDocumentMessage {
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
			media: MessageMediaPresenter.toHttp(message.media),
		}
	}
}
