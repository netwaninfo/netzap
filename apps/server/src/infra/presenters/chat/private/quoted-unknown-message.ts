import { PrivateUnknownMessage } from '@/domain/chat/enterprise/entities/private/unknown-message'
import { PrivateQuotedUnknownMessage } from '@netzap/contracts/chat'
import { Except } from 'type-fest'

export class PrivateQuotedUnknownMessagePresenter {
	static toHttp(
		message: Except<PrivateUnknownMessage, 'quoted'>,
	): PrivateQuotedUnknownMessage {
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
		}
	}
}
