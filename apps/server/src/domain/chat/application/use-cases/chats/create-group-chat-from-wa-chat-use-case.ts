import { type Either, failure, success } from '@/core/either'
import { GroupChat } from '@/domain/chat/enterprise/entities/group/chat'
import type { WAGroupChat } from '@/domain/chat/enterprise/entities/wa/group/chat'
import type { Chat } from '@/domain/chat/enterprise/types/chat'
import { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error'
import type { ChatsRepository } from '../../repositories/chats-repository'
import type { GroupsRepository } from '../../repositories/groups-repository'
import type { CreateContactsFromWAContactsUseCase } from '../contacts/create-contacts-from-wa-contacts-use-case'
import type { CreateGroupFromWAContactUseCase } from '../groups/create-group-from-wa-contact-use-case'

interface CreateGroupChatFromWAChatUseCaseRequest {
  waChat: WAGroupChat
}

type CreateGroupChatFromWAChatUseCaseResponse = Either<
  ResourceAlreadyExistsError | null,
  {
    chat: Chat
  }
>

export class CreateGroupChatFromWAChatUseCase {
  constructor(
    private chatsRepository: ChatsRepository,
    private groupsRepository: GroupsRepository,
    private createGroupFromWAContactUseCase: CreateGroupFromWAContactUseCase,
    private createContactsFromWAContacts: CreateContactsFromWAContactsUseCase
  ) {}

  async execute(
    request: CreateGroupChatFromWAChatUseCaseRequest
  ): Promise<CreateGroupChatFromWAChatUseCaseResponse> {
    const { waChat } = request

    const someChat =
      await this.chatsRepository.findUniqueGroupChatByWAChatIdAndInstanceId({
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
      const response = await this.createGroupFromWAContactUseCase.execute({
        waContact: waChat.contact,
      })

      if (response.isFailure()) return failure(response.value)
      group = response.value.group
    }

    const response = await this.createContactsFromWAContacts.execute({
      waContacts: waChat.participants,
      instanceId: waChat.instanceId,
    })

    if (response.isFailure()) return failure(response.value)

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
