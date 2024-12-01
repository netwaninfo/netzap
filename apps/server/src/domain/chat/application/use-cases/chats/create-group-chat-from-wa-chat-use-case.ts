import { type Either, failure, success } from '@/core/either'
import { GroupChat } from '@/domain/chat/enterprise/entities/group/chat'
import type { WAGroupChat } from '@/domain/chat/enterprise/entities/wa/group/chat'
import type { Chat } from '@/domain/chat/enterprise/types/chat'
import { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error'
import { Injectable } from '@nestjs/common'
import { ChatsRepository } from '../../repositories/chats-repository'
import { GroupsRepository } from '../../repositories/groups-repository'
import { DateService } from '../../services/date-service'
import { CreateContactsFromWAContactsUseCase } from '../contacts/create-contacts-from-wa-contacts-use-case'
import { CreateGroupFromWAContactUseCase } from '../groups/create-group-from-wa-contact-use-case'

interface CreateGroupChatFromWAChatUseCaseRequest {
  waChat: WAGroupChat
}

type CreateGroupChatFromWAChatUseCaseResponse = Either<
  ResourceAlreadyExistsError | null,
  {
    chat: Chat
  }
>

@Injectable()
export class CreateGroupChatFromWAChatUseCase {
  constructor(
    private chatsRepository: ChatsRepository,
    private groupsRepository: GroupsRepository,
    private createGroupFromWAContactUseCase: CreateGroupFromWAContactUseCase,
    private createContactsFromWAContacts: CreateContactsFromWAContactsUseCase,
    private dateService: DateService
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
      group,
      instanceId: waChat.instanceId,
      unreadCount: waChat.unreadCount,
      waChatId: waChat.id,
      lastInteractionAt: this.dateService.fromUnix(waChat.timestamp).toDate(),
    })

    await this.chatsRepository.create(chat)

    return success({
      chat,
    })
  }
}
