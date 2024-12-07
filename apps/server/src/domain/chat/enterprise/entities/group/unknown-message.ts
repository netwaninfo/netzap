import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Except, SetOptional } from 'type-fest'
import { GroupMessage, type GroupMessageProps } from './message'
import { GroupRevokedMessage } from './revoked-message'

export interface GroupUnknownMessageProps extends GroupMessageProps {
  type: 'unknown'
  payload: unknown
}

export class GroupUnknownMessage extends GroupMessage<GroupUnknownMessageProps> {
  get type() {
    return this.props.type
  }

  get payload() {
    return this.props.payload
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
        GroupUnknownMessageProps,
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
    return new GroupUnknownMessage(
      {
        ...props,
        chatType: 'group',
        type: 'unknown',
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
