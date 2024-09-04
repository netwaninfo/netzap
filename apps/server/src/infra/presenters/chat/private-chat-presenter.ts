import { PrivateChat } from '@/domain/chat/enterprise/entities/private/chat'
import { ChatHttpPrivateChat } from '@netzap/contracts/http'

export class PrivateChatPresenter {
	static toHttp(chat: PrivateChat): ChatHttpPrivateChat {
		return {
			id: chat.id.toString(),
			contactId: chat.contactId.toString(),
			instanceId: chat.instanceId.toString(),
			lastMessage: null, // TODO: Replace by PrivateMessageMessagePresenter
			unreadCount: chat.unreadCount,
			waChatId: chat.waChatId.toString(),
		}
	}
}
