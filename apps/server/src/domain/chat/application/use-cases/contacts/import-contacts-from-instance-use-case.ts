import { Injectable } from '@nestjs/common'

import { type Either, failure, success } from '@/core/either.js'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { Contact } from '@/domain/chat/enterprise/entities/contact.js'
import { ServiceUnavailableError } from '@/domain/shared/errors/service-unavailable-error.js'
import { UnhandledError } from '@/domain/shared/errors/unhandled-error.js'
import { WhatsAppService } from '../../services/whats-app-service.js'
import { CreateContactsFromWAContactsUseCase } from './create-contacts-from-wa-contacts-use-case.js'

interface ImportContactsFromInstanceUseCaseRequest {
  instanceId: UniqueEntityID
}

type ImportContactsFromInstanceUseCaseResponse = Either<
  UnhandledError | ServiceUnavailableError | null,
  {
    contacts: Contact[]
  }
>

@Injectable()
export class ImportContactsFromInstanceUseCase {
  constructor(
    private createContactsFromWAContacts: CreateContactsFromWAContactsUseCase,
    private whatsAppService: WhatsAppService
  ) {}

  async execute(
    request: ImportContactsFromInstanceUseCaseRequest
  ): Promise<ImportContactsFromInstanceUseCaseResponse> {
    const { instanceId } = request

    const response = await this.whatsAppService.getContactsFromInstance({
      instanceId,
    })

    if (response.isFailure()) return failure(response.value)

    const waContacts = response.value
    const createContactsResponse =
      await this.createContactsFromWAContacts.execute({
        waContacts,
        instanceId,
      })

    if (createContactsResponse.isFailure()) {
      return failure(createContactsResponse.value)
    }

    const { contacts } = createContactsResponse.value

    return success({ contacts })
  }
}
