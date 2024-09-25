import { type Either, failure, success } from '@/core/either'
import { PrivateVCardMessage } from '@/domain/chat/enterprise/entities/private/v-card-message'
import type { WAPrivateMessage } from '@/domain/chat/enterprise/entities/wa/private/message'
import type { PrivateMessage } from '@/domain/chat/enterprise/types/message'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import type { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { ChatsRepository } from '../../../repositories/chats-repository'
import { ContactsRepository } from '../../../repositories/contacts-repository'
import { MessagesRepository } from '../../../repositories/messages-repository'
import { DateService } from '../../../services/date-service'
import { CreateContactFromWAContactUseCase } from '../../contacts/create-contact-from-wa-contact-use-case'

interface CreatePrivateVCardMessageFromWAMessageUseCaseRequest {
  waMessage: WAPrivateMessage
}

type CreatePrivateVCardMessageFromWAMessageUseCaseResponse = Either<
  | ResourceNotFoundError
  | InvalidResourceFormatError
  | ResourceAlreadyExistsError,
  {
    message: PrivateVCardMessage
  }
>

@Injectable()
export class CreatePrivateVCardMessageFromWAMessageUseCase {
  constructor(
    private chatsRepository: ChatsRepository,
    private messagesRepository: MessagesRepository,
    private contactsRepository: ContactsRepository,
    private createContactFromWAContact: CreateContactFromWAContactUseCase,
    private dateService: DateService
  ) {}

  async execute(
    request: CreatePrivateVCardMessageFromWAMessageUseCaseRequest
  ): Promise<CreatePrivateVCardMessageFromWAMessageUseCaseResponse> {
    const { waMessage } = request

    const waContact = waMessage.contacts?.at(0)
    const hasInvalidFormat =
      waMessage.type !== 'vcard' || !waMessage.hasContacts() || !waContact

    if (hasInvalidFormat) {
      return failure(new InvalidResourceFormatError({ id: waMessage.ref }))
    }

    const chat =
      await this.chatsRepository.findUniquePrivateChatByWAChatIdAndInstanceId({
        instanceId: waMessage.instanceId,
        waChatId: waMessage.waChatId,
      })

    if (!chat) {
      return failure(
        new ResourceNotFoundError({
          id: `${waMessage.instanceId.toString()}/${waMessage.waChatId.toString()}`,
        })
      )
    }

    let quoted: PrivateMessage | null = null

    if (waMessage.hasQuoted()) {
      quoted =
        await this.messagesRepository.findUniquePrivateMessageByChatIAndWAMessageId(
          {
            chatId: chat.id,
            waMessageId: waMessage.quoted.id,
          }
        )
    }

    let contact =
      await this.contactsRepository.findUniqueByWAContactIdAndInstanceId({
        instanceId: waMessage.instanceId,
        waContactId: waContact.id,
      })

    if (!contact) {
      const response = await this.createContactFromWAContact.execute({
        waContact,
      })

      if (response.isFailure()) return failure(response.value)
      contact = response.value.contact
    }

    const message = PrivateVCardMessage.create({
      quoted,
      contact,
      chatId: chat.id,
      instanceId: chat.instanceId,
      waChatId: chat.waChatId,
      waMessageId: waMessage.id,
      isForwarded: waMessage.isForwarded,
      createdAt: this.dateService.fromUnix(waMessage.timestamp).toDate(),
      isFromMe: waMessage.isFromMe,
      status: waMessage.ack,
    })

    await this.messagesRepository.create(message)

    return success({ message })
  }
}
