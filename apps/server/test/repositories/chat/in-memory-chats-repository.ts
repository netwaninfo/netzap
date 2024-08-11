import type {
	ChatsRepository,
	ChatsRepositoryFindUniqueByWAChatIdAndInstanceId,
	ChatsRepositoryFindUniqueGroupChatByWAChatIdAndInstanceId,
	ChatsRepositoryFindUniquePrivateChatByWAChatIdAndInstanceId,
} from '@/domain/chat/application/repositories/chats-repository'
import type { GroupChat } from '@/domain/chat/enterprise/entities/group/chat'
import type { PrivateChat } from '@/domain/chat/enterprise/entities/private/chat'
import {
	isGroupChat,
	isPrivateChat,
} from '@/domain/chat/enterprise/type-guards/chat'
import type { Chat } from '@/domain/chat/enterprise/types/chat'

export class InMemoryChatsRepository implements ChatsRepository {
	items: Chat[] = []

	async findUniqueByWAChatIdAndInstanceId({
		instanceId,
		waChatId,
	}: ChatsRepositoryFindUniqueByWAChatIdAndInstanceId): Promise<Chat | null> {
		const item = this.items.find(
			(item) =>
				item.waChatId.equals(waChatId) && item.instanceId.equals(instanceId),
		)

		return item ?? null
	}

	async findUniqueGroupChatByWAChatIdAndInstanceId({
		instanceId,
		waChatId,
	}: ChatsRepositoryFindUniqueGroupChatByWAChatIdAndInstanceId): Promise<GroupChat | null> {
		const item = this.items.find(
			(item): item is GroupChat =>
				item.waChatId.equals(waChatId) &&
				item.instanceId.equals(instanceId) &&
				isGroupChat(item),
		)

		return item ?? null
	}

	async findUniquePrivateChatByWAChatIdAndInstanceId({
		instanceId,
		waChatId,
	}: ChatsRepositoryFindUniquePrivateChatByWAChatIdAndInstanceId): Promise<PrivateChat | null> {
		const item = this.items.find(
			(item): item is PrivateChat =>
				item.waChatId.equals(waChatId) &&
				item.instanceId.equals(instanceId) &&
				isPrivateChat(item),
		)

		return item ?? null
	}

	async create(chat: Chat): Promise<void> {
		this.items.push(chat)
	}

	async save(chat: Chat): Promise<void> {
		const itemIndex = this.items.findIndex(
			(item) => item.id.toString() === chat.id.toString(),
		)

		this.items[itemIndex] = chat
	}
}
