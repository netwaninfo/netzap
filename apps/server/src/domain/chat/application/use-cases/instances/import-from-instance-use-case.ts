import { Injectable } from '@nestjs/common'

import { Either, success } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ImportChatsFromInstanceUseCase } from '../chats/import-chats-from-instance-use-case'
import { ImportContactsFromInstanceUseCase } from '../contacts/import-contacts-from-instance-use-case'
import { ImportMessagesFromInstanceUseCase } from '../messages/import-messages-from-instance-use-case'

interface ImportFromInstanceUseCaseRequest {
  instanceId: UniqueEntityID
}

type ImportFromInstanceUseCaseResponse = Either<null, object>

@Injectable()
export class ImportFromInstanceUseCase {
  constructor(
    private importContacts: ImportContactsFromInstanceUseCase,
    private importChats: ImportChatsFromInstanceUseCase,
    private importMessages: ImportMessagesFromInstanceUseCase
  ) {}

  async execute(
    request: ImportFromInstanceUseCaseRequest
  ): Promise<ImportFromInstanceUseCaseResponse> {
    const { instanceId } = request

    this.importContacts
      .execute({ instanceId })
      .then(() => this.importChats.execute({ instanceId }))
      .then(() => this.importMessages.execute({ instanceId }))
      .then(() => console.log('FINISHED'))

    return success({})
  }
}
