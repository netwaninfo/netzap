import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import type { Except, SetOptional } from 'type-fest'
import type { Contact } from '../contact.js'
import { PrivateMessage, type PrivateMessageProps } from './message.js'
import { PrivateRevokedMessage } from './revoked-message.js'

export interface PrivateVCardMessageProps extends PrivateMessageProps {
  type: 'vcard'
  contact: Contact
}

export class PrivateVCardMessage extends PrivateMessage<PrivateVCardMessageProps> {
  get type() {
    return this.props.type
  }

  get contact() {
    return this.props.contact
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
        PrivateVCardMessageProps,
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
    return new PrivateVCardMessage(
      {
        ...props,
        chatType: 'private',
        type: 'vcard',
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
