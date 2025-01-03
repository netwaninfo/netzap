import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import type { Except, SetNonNullable, SetOptional } from 'type-fest'
import type { MessageMedia } from '../message-media.js'
import { GroupMessage, type GroupMessageProps } from './message.js'
import { GroupRevokedMessage } from './revoked-message.js'

export interface GroupDocumentMessageProps extends GroupMessageProps {
  type: 'document'
  media: MessageMedia | null
  body: string | null
}

export class GroupDocumentMessage extends GroupMessage<GroupDocumentMessageProps> {
  get type() {
    return this.props.type
  }

  get media() {
    return this.props.media
  }

  hasMedia(): this is SetNonNullable<GroupDocumentMessageProps, 'media'> {
    return !!this.media
  }

  get body() {
    return this.props.body
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
        GroupDocumentMessageProps,
        | 'quoted'
        | 'status'
        | 'isForwarded'
        | 'isFromMe'
        | 'sentBy'
        | 'createdAt'
        | 'body'
        | 'media'
      >,
      'type' | 'chatType'
    >,
    id?: UniqueEntityID
  ) {
    return new GroupDocumentMessage(
      {
        ...props,
        chatType: 'group',
        type: 'document',
        body: props.body?.trim() ? props.body : null,
        quoted: props.quoted ?? null,
        status: props.status ?? 'pending',
        isForwarded: props.isForwarded ?? false,
        isFromMe: props.isFromMe ?? true,
        sentBy: props.sentBy ?? null,
        createdAt: props.createdAt ?? new Date(),
        media: props.media ?? null,
      },
      id
    )
  }
}
