import { type Either, failure, success } from '@/core/either.js'
import { Contact } from '@/domain/chat/enterprise/entities/contact.js'
import { ContactPhone } from '@/domain/chat/enterprise/entities/value-objects/contact-phone.js'
import type { WAPrivateContact } from '@/domain/chat/enterprise/entities/wa/private/contact.js'
import { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error.js'
import { Injectable } from '@nestjs/common'
import { ContactsRepository } from '../../repositories/contacts-repository.js'

interface CreateContactFromWAContactUseCaseRequest {
  waContact: WAPrivateContact
}

type CreateContactFromWAContactUseCaseResponse = Either<
  ResourceAlreadyExistsError,
  {
    contact: Contact
  }
>

@Injectable()
export class CreateContactFromWAContactUseCase {
  constructor(private contactsRepository: ContactsRepository) {}

  async execute(
    request: CreateContactFromWAContactUseCaseRequest
  ): Promise<CreateContactFromWAContactUseCaseResponse> {
    const { waContact } = request

    const someContact =
      await this.contactsRepository.findUniqueByWAContactIdAndInstanceId({
        instanceId: waContact.instanceId,
        waContactId: waContact.id,
      })

    const hasSomeContact = !!someContact
    if (hasSomeContact) {
      return failure(new ResourceAlreadyExistsError({ id: waContact.ref }))
    }

    const contact = Contact.create({
      instanceId: waContact.instanceId,
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

    await this.contactsRepository.create(contact)

    return success({ contact })
  }
}
