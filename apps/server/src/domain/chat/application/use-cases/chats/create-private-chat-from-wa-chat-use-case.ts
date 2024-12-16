import { type Either, failure, success } from '@/core/either'
import { PrivateChat } from '@/domain/chat/enterprise/entities/private/chat'
import type { WAPrivateChat } from '@/domain/chat/enterprise/entities/wa/private/chat'
import type { Chat } from '@/domain/chat/enterprise/types/chat'
import { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error'
import { Injectable } from '@nestjs/common'
import { ChatsRepository } from '../../repositories/chats-repository'
import { ContactsRepository } from '../../repositories/contacts-repository'
import { DateService } from '../../services/date-service'
import { CreateContactFromWAContactUseCase } from '../contacts/create-contact-from-wa-contact-use-case'

interface CreatePrivateChatFromWAChatUseCaseRequest {
  waChat: WAPrivateChat
}

type CreatePrivateChatFromWAChatUseCaseResponse = Either<
  ResourceAlreadyExistsError,
  {
    chat: Chat
  }
>

@Injectable()
export class CreatePrivateChatFromWAChatUseCase {
  constructor(
    private chatsRepository: ChatsRepository,
    private contactsRepository: ContactsRepository,
    private createContactFromWAContact: CreateContactFromWAContactUseCase,
    private dateService: DateService
  ) {}

  async execute(
    request: CreatePrivateChatFromWAChatUseCaseRequest
  ): Promise<CreatePrivateChatFromWAChatUseCaseResponse> {
    const { waChat } = request

    const someChat =
      await this.chatsRepository.findUniquePrivateChatByWAChatIdAndInstanceId({
        instanceId: waChat.instanceId,
        waChatId: waChat.id,
      })

    if (someChat) {
      return failure(new ResourceAlreadyExistsError({ id: waChat.ref }))
    }

    let contact =
      await this.contactsRepository.findUniqueByWAContactIdAndInstanceId({
        instanceId: waChat.contact.instanceId,
        waContactId: waChat.contact.id,
      })

    if (!contact) {
      const response = await this.createContactFromWAContact.execute({
        waContact: waChat.contact,
      })

      if (response.isFailure()) return failure(response.value)
      contact = response.value.contact
    }

    const lastInteractionAt = waChat.hasTimestamp()
      ? this.dateService.fromUnix(waChat.timestamp).toDate()
      : null

    const chat = PrivateChat.create({
      contact,
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
