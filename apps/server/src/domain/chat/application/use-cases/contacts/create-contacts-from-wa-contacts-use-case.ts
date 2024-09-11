import { type Either, success } from '@/core/either'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Contact } from '@/domain/chat/enterprise/entities/contact'
import { ContactPhone } from '@/domain/chat/enterprise/entities/value-objects/contact-phone'
import type { WAPrivateContact } from '@/domain/chat/enterprise/entities/wa/private/contact'
import type { ContactsRepository } from '../../repositories/contacts-repository'

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

export class CreateContactsFromWAContactsUseCase {
  constructor(private contactsRepository: ContactsRepository) {}

  async execute(
    request: CreateContactsFromWAContactsUseCaseRequest
  ): Promise<CreateContactsFromWAContactsUseCaseResponse> {
    const { waContacts, instanceId } = request

    const [myWAContacts, othersWAContacts] = [
      waContacts.filter(waContact => waContact.isMyContact),
      waContacts.filter(waContact => !waContact.isMyContact),
    ]

    const myContactsAreCreated =
      await this.contactsRepository.findManyByWAContactIdsAndInstanceId({
        instanceId,
        waContactIds: myWAContacts.map(waContact => waContact.id),
      })

    const myContactsAreNotCreated = myWAContacts.filter(
      waContact =>
        !myContactsAreCreated.some(contact =>
          contact.waContactId.equals(waContact.id)
        )
    )

    const othersContacts = myContactsAreNotCreated
      .concat(othersWAContacts)
      .map(waContact => {
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

    await this.contactsRepository.createMany(othersContacts)
    const contacts = myContactsAreCreated.concat(othersContacts)

    return success({ contacts })
  }
}
