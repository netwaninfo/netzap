import { type Either, success } from '@/core/either.js'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { Contact } from '@/domain/chat/enterprise/entities/contact.js'
import { ContactPhone } from '@/domain/chat/enterprise/entities/value-objects/contact-phone.js'
import type { WAPrivateContact } from '@/domain/chat/enterprise/entities/wa/private/contact.js'
import { Injectable } from '@nestjs/common'
import { ContactsRepository } from '../../repositories/contacts-repository.js'

interface CreateContactsFromWAContactsUseCaseRequest {
  waContacts: WAPrivateContact[]
  instanceId: UniqueEntityID
}

type CreateContactsFromWAContactsUseCaseResponse = Either<
  null,
  {
    contacts: Contact[]
  }
>

@Injectable()
export class CreateContactsFromWAContactsUseCase {
  constructor(private contactsRepository: ContactsRepository) {}

  async execute(
    request: CreateContactsFromWAContactsUseCaseRequest
  ): Promise<CreateContactsFromWAContactsUseCaseResponse> {
    const { waContacts, instanceId } = request

    const contactsAreCreated =
      await this.contactsRepository.findManyByWAContactIdsAndInstanceId({
        instanceId,
        waContactIds: waContacts.map(waContact => waContact.id),
      })

    const waContactsAreNotCreated = !contactsAreCreated.length
      ? waContacts
      : waContacts.filter(
          waContact =>
            !contactsAreCreated.some(contact =>
              contact.waContactId.equals(waContact.id)
            )
        )

    const newContacts = waContactsAreNotCreated.map(waContact => {
      return Contact.create({
        instanceId,
        name: waContact.defaultName,
        phone: ContactPhone.create({
          formattedNumber: waContact.formattedNumber,
          number: waContact.number,
        }),
        waContactId: waContact.id,
        imageUrl: waContact.imageUrl,
        isInstance: waContact.isInstance,
        isMe: waContact.isMe,
        isMyContact: waContact.isMyContact,
      })
    })

    await this.contactsRepository.createMany(newContacts)
    const contacts = contactsAreCreated.concat(newContacts)

    return success({ contacts })
  }
}
