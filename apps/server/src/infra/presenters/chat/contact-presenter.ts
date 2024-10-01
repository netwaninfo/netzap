import { Contact } from '@/domain/chat/enterprise/entities/contact'

import { Contact as Output } from '@netzap/entities/chat'

export class ContactPresenter {
  static toOutput(contact: Contact): Output {
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
