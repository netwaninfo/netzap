import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Except, SetNonNullable, SetOptional } from 'type-fest'
import type { MessageMedia } from '../message-media'
import { PrivateMessage, type PrivateMessageProps } from './message'
import { PrivateRevokedMessage } from './revoked-message'

export interface PrivateAudioMessageProps extends PrivateMessageProps {
  type: 'audio'
  media: MessageMedia | null
}

export class PrivateAudioMessage extends PrivateMessage<PrivateAudioMessageProps> {
  get type() {
    return this.props.type
  }

  get media() {
    return this.props.media
  }

  hasMedia(): this is SetNonNullable<PrivateAudioMessageProps, 'media'> {
    return !!this.media
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
        PrivateAudioMessageProps,
        | 'quoted'
        | 'status'
        | 'isForwarded'
        | 'isFromMe'
        | 'sentBy'
        | 'createdAt'
        | 'media'
      >,
      'type' | 'chatType'
    >,
    id?: UniqueEntityID
  ) {
    return new PrivateAudioMessage(
      {
        ...props,
        chatType: 'private',
        type: 'audio',
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
