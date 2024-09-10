import { GroupRevokedMessage } from '@/domain/chat/enterprise/entities/group/revoked-message'
import { GroupRevokedMessage as HttpGroupRevokedMessage } from '@netzap/contracts/chat'
import { ContactPresenter } from '../contact-presenter'

export class GroupRevokedMessagePresenter {
	static toHttp(message: GroupRevokedMessage): HttpGroupRevokedMessage {
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
			revokedAt: message.revokedAt,
			revokedBy: message.revokedBy?.toString() ?? null,
		}
	}
}
