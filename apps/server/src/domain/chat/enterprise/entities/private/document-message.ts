import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import type { Except, SetNonNullable, SetOptional } from 'type-fest'
import type { MessageMedia } from '../message-media.js'
import { PrivateMessage, type PrivateMessageProps } from './message.js'
import { PrivateRevokedMessage } from './revoked-message.js'

export interface PrivateDocumentMessageProps extends PrivateMessageProps {
  type: 'document'
  media: MessageMedia | null
  body: string | null
}

export class PrivateDocumentMessage extends PrivateMessage<PrivateDocumentMessageProps> {
  get type() {
    return this.props.type
  }

  get media() {
    return this.props.media
  }

  hasMedia(): this is SetNonNullable<PrivateDocumentMessageProps, 'media'> {
    return !!this.media
  }

  get body() {
    return this.props.body
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
        PrivateDocumentMessageProps,
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
    return new PrivateDocumentMessage(
      {
        ...props,
        chatType: 'private',
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
