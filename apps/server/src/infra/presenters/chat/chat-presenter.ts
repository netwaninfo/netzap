import { isPrivateChat } from '@/domain/chat/enterprise/type-guards/chat'
import { Chat } from '@/domain/chat/enterprise/types/chat'
import { Chat as HttpChat } from '@netzap/contracts/chat'
import { GroupChatPresenter } from './group/chat-presenter'
import { PrivateChatPresenter } from './private/chat-presenter'

export class ChatPresenter {
	static toHttp(chat: Chat): HttpChat {
		if (isPrivateChat(chat)) {
			return PrivateChatPresenter.toHttp(chat)
		}

		return GroupChatPresenter.toHttp(chat)
	}
}
