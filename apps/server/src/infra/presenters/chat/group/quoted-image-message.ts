import { GroupImageMessage } from '@/domain/chat/enterprise/entities/group/image-message'
import { GroupQuotedImageMessage } from '@netzap/contracts/chat'
import { Except } from 'type-fest'
import { ContactPresenter } from '../contact-presenter'
import { MessageMediaPresenter } from '../message-media-presenter'

export class GroupQuotedImageMessagePresenter {
	static toHttp(
		message: Except<GroupImageMessage, 'quoted'>,
	): GroupQuotedImageMessage {
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
			media: MessageMediaPresenter.toHttp(message.media),
		}
	}
}
