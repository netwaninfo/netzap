import { GroupMessage as BaseGroupMessage } from '../entities/group/message'
import { PrivateMessage as BasePrivateMessage } from '../entities/private/message'
import type { GroupMessage, Message, PrivateMessage } from '../types/message'

export function isPrivateMessage(message: Message): message is PrivateMessage {
	return message instanceof BasePrivateMessage
}

export function isGroupMessage(message: Message): message is GroupMessage {
	return message instanceof BaseGroupMessage
}
