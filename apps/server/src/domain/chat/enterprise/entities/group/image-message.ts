import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Except, SetNonNullable, SetOptional } from 'type-fest'
import type { MessageMedia } from '../message-media'
import { GroupMessage, type GroupMessageProps } from './message'
import { GroupRevokedMessage } from './revoked-message'

export interface GroupImageMessageProps extends GroupMessageProps {
  type: 'image'
  media: MessageMedia | null
  body: string | null
}

export class GroupImageMessage extends GroupMessage<GroupImageMessageProps> {
  get type() {
    return this.props.type
  }

  get media() {
    return this.props.media
  }

  hasMedia(): this is SetNonNullable<GroupImageMessageProps, 'media'> {
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
        GroupImageMessageProps,
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
    return new GroupImageMessage(
      {
        ...props,
        chatType: 'group',
        type: 'image',
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
