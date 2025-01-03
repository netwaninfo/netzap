import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import type { Except, SetOptional } from 'type-fest'
import type { Contact } from '../contact.js'
import { PrivateMessage, type PrivateMessageProps } from './message.js'
import { PrivateRevokedMessage } from './revoked-message.js'

export interface PrivateMultiVCardMessageProps extends PrivateMessageProps {
  type: 'multi_vcard'
  contacts: Contact[]
}

export class PrivateMultiVCardMessage extends PrivateMessage<PrivateMultiVCardMessageProps> {
  get type() {
    return this.props.type
  }

  get contacts() {
    return this.props.contacts
  }

  hasContacts() {
    return !!this.contacts.length
  }

  revoke(): PrivateRevokedMessage {
    return PrivateRevokedMessage.create(
      {
        chatId: this.chatId,
        instanceId: this.instanceId,
        waChatId: this.waChatId,
        waMessageId: this.waMessageId,
        isForwarded: this.isForwarded,
        createdAt: this.createdAt,
        revokedAt: new Date(),
        isFromMe: this.isFromMe,
        status: this.status,
      },
      this.id
    )
  }

  static create(
    props: Except<
      SetOptional<
        PrivateMultiVCardMessageProps,
        | 'quoted'
        | 'status'
        | 'isForwarded'
        | 'isFromMe'
        | 'sentBy'
        | 'createdAt'
      >,
      'type' | 'chatType'
    >,
    id?: UniqueEntityID
  ) {
    return new PrivateMultiVCardMessage(
      {
        ...props,
        chatType: 'private',
        type: 'multi_vcard',
        quoted: props.quoted ?? null,
        status: props.status ?? 'pending',
        isForwarded: props.isForwarded ?? false,
        isFromMe: props.isFromMe ?? true,
        sentBy: props.sentBy ?? null,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )
  }
}
