import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import type { Except, SetOptional } from 'type-fest'
import type { Contact } from '../contact.js'
import { GroupMessage, type GroupMessageProps } from './message.js'
import { GroupRevokedMessage } from './revoked-message.js'

export interface GroupVCardMessageProps extends GroupMessageProps {
  type: 'vcard'
  contact: Contact
}

export class GroupVCardMessage extends GroupMessage<GroupVCardMessageProps> {
  get type() {
    return this.props.type
  }

  get contact() {
    return this.props.contact
  }

  revoke(): GroupRevokedMessage {
    return GroupRevokedMessage.create(
      {
        author: this.author,
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
        GroupVCardMessageProps,
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
    return new GroupVCardMessage(
      {
        ...props,
        chatType: 'group',
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
