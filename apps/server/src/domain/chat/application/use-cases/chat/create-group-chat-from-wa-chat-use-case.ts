import { type Either, failure, success } from '@/core/either'
import { GroupChat } from '@/domain/chat/enterprise/entities/group/chat'
import type { WAGroupChat } from '@/domain/chat/enterprise/entities/wa/group/chat'
import type { Chat } from '@/domain/chat/enterprise/types/chat'
import { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error'
import type { ChatsRepository } from '../../repositories/chats-repository'
import type { GroupsRepository } from '../../repositories/groups-repository'
import type { CreateGroupFromWAContact } from '../group/create-group-from-wa-contact-use-case'

interface CreateGroupChatFromWAChatUseCaseRequest {
	waChat: WAGroupChat
}

type CreateGroupChatFromWAChatUseCaseResponse = Either<
	ResourceAlreadyExistsError,
	{
		chat: Chat
	}
>

export class CreateGroupChatFromWAChatUseCase {
	constructor(
		private chatsRepository: ChatsRepository,
		private groupsRepository: GroupsRepository,
		private createGroupFromWAContact: CreateGroupFromWAContact,
	) {}

	async execute(
		request: CreateGroupChatFromWAChatUseCaseRequest,
	): Promise<CreateGroupChatFromWAChatUseCaseResponse> {
		const { waChat } = request

		const someChat =
			await this.chatsRepository.findUniqueByWAChatIdAndInstanceId({
				instanceId: waChat.instanceId,
				waChatId: waChat.id,
			})

		if (someChat) {
			return failure(new ResourceAlreadyExistsError({ id: waChat.ref }))
		}

		let group = await this.groupsRepository.findUniqueByWAGroupIdAndInstanceId({
			instanceId: waChat.contact.instanceId,
			waGroupId: waChat.contact.id,
		})

		if (!group) {
			const result = await this.createGroupFromWAContact.execute({
				waContact: waChat.contact,
			})

			if (result.isFailure()) return failure(result.value)
			group = result.value.group
		}

		const chat = GroupChat.create({
			groupId: group.id,
			instanceId: waChat.instanceId,
			unreadCount: waChat.unreadCount,
			waChatId: waChat.id,
		})

		await this.chatsRepository.create(chat)

		return success({
			chat,
		})
	}
}
