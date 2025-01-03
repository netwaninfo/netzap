import { type Either, failure, success } from '@/core/either.js'
import { GroupChat } from '@/domain/chat/enterprise/entities/group/chat.js'
import type { WAGroupChat } from '@/domain/chat/enterprise/entities/wa/group/chat.js'
import type { Chat } from '@/domain/chat/enterprise/types/chat.js'
import { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error.js'
import { Injectable } from '@nestjs/common'
import { ChatsRepository } from '../../repositories/chats-repository.js'
import { GroupsRepository } from '../../repositories/groups-repository.js'
import { DateService } from '../../services/date-service.js'
import { CreateContactsFromWAContactsUseCase } from '../contacts/create-contacts-from-wa-contacts-use-case.js'
import { CreateGroupFromWAContactUseCase } from '../groups/create-group-from-wa-contact-use-case.js'

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

    const lastInteractionAt = waChat.hasTimestamp()
      ? this.dateService.fromUnix(waChat.timestamp).toDate()
      : null

    const chat = GroupChat.create({
      group,
      lastInteractionAt,
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
