import { Contact } from '@/domain/chat/enterprise/entities/contact'

import { Contact as HttpContact } from '@netzap/contracts/chat'

export class ContactPresenter {
  static toHttp(contact: Contact): HttpContact {
    return {
      id: contact.id.toString(),
      imageUrl: contact.imageUrl,
      instanceId: contact.instanceId.toString(),
      isInstance: contact.isInstance,
      isMe: contact.isMe,
      isMyContact: contact.isMyContact,
      name: contact.name,
      phone: contact.phone.formattedNumber,
      waContactId: contact.waContactId.toString(),
    }
  }
}
