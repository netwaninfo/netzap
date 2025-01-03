import { Injectable } from '@nestjs/common'

import { type Either, success } from '@/core/either.js'
import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { ImportChatsFromInstanceUseCase } from '../chats/import-chats-from-instance-use-case.js'
import { ImportContactsFromInstanceUseCase } from '../contacts/import-contacts-from-instance-use-case.js'
import { ImportMessagesFromInstanceUseCase } from '../messages/import-messages-from-instance-use-case.js'

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

    console.time('IMPORT')
    console.log('START')
    this.importContacts
      .execute({ instanceId })
      .then(() => this.importChats.execute({ instanceId }))
      .then(() => this.importMessages.execute({ instanceId }))
      .then(() => {
        console.log('FINISHED')
        console.timeEnd('IMPORT')
      })
      .catch(err => {
        console.log(err)
      })

    return success({})
  }
}
