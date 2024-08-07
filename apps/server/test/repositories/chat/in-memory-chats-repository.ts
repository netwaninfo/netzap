import type {
	ChatsRepository,
	ChatsRepositoryFindUniqueByWAChatIdAndInstanceIdParams,
} from '@/domain/chat/application/repositories/chats-repository'
import type { Chat } from '@/domain/chat/enterprise/types/chat'

export class InMemoryChatsRepository implements ChatsRepository {
	items: Chat[] = []

	async findUniqueByWAChatIdAndInstanceId({
		instanceId,
		waChatId,
	}: ChatsRepositoryFindUniqueByWAChatIdAndInstanceIdParams): Promise<Chat | null> {
		const item = this.items.find(
			(item) =>
				item.waChatId.equals(waChatId) && item.instanceId.equals(instanceId),
		)

		return item ?? null
	}

	async create(chat: Chat): Promise<void> {
		this.items.push(chat)
	}

	async save(chat: Chat): Promise<void> {
		this.items.push(chat)
	}
}
