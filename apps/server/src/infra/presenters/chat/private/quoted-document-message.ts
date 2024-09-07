import { PrivateDocumentMessage } from '@/domain/chat/enterprise/entities/private/document-message'
import { PrivateQuotedDocumentMessage } from '@netzap/contracts/chat'
import { Except } from 'type-fest'
import { MessageMediaPresenter } from '../message-media-presenter'

export class PrivateQuotedDocumentMessagePresenter {
	static toHttp(
		message: Except<PrivateDocumentMessage, 'quoted'>,
	): PrivateQuotedDocumentMessage {
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
			body: message.body,
			media: MessageMediaPresenter.toHttp(message.media),
		}
	}
}
