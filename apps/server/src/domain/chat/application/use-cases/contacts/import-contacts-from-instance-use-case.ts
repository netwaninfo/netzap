import { type Either, failure, success } from '@/core/either'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Contact } from '@/domain/chat/enterprise/entities/contact'
import { ServiceUnavailableError } from '@/domain/shared/errors/service-unavailable-error'
import { UnhandledError } from '@/domain/shared/errors/unhandled-error'
import { WhatsAppService } from '../../services/whats-app-service'
import { CreateContactsFromWAContactsUseCase } from './create-contacts-from-wa-contacts-use-case'

interface ImportContactsFromInstanceUseCaseRequest {
  instanceId: UniqueEntityID
}

type ImportContactsFromInstanceUseCaseResponse = Either<
  UnhandledError | ServiceUnavailableError | null,
  {
    contacts: Contact[]
  }
>

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
