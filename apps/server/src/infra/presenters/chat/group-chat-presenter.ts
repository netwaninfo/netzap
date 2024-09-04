import { GroupChat } from '@/domain/chat/enterprise/entities/group/chat'
import { ChatHttpGroupChat } from '@netzap/contracts/http'

export class GroupChatPresenter {
	static toHttp(chat: GroupChat): ChatHttpGroupChat {
		return {
			id: chat.id.toString(),
			groupId: chat.groupId.toString(),
			instanceId: chat.instanceId.toString(),
			lastMessage: null, // TODO: Replace by GroupMessageMessagePresenter
			unreadCount: chat.unreadCount,
			waChatId: chat.waChatId.toString(),
		}
	}
}
