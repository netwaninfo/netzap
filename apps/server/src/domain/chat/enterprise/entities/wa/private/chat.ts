import type { Except, SetNonNullable, SetOptional } from 'type-fest'
import type { WAEntityID } from '../../value-objects/wa-entity-id.js'
import { WAChat, type WAChatProps } from '../chat.js'
import type { WAPrivateContact } from './contact.js'
import type { WAPrivateMessage } from './message.js'

export interface WAPrivateChatProps extends WAChatProps {
  isGroup: false
  contact: WAPrivateContact
  lastMessage: WAPrivateMessage | null
}

export class WAPrivateChat extends WAChat<WAPrivateChatProps> {
  get isGroup() {
    return this.props.isGroup
  }

  get contact() {
    return this.props.contact
  }

  get lastMessage() {
    return this.props.lastMessage
  }

  hasLastMessage(): this is SetNonNullable<WAPrivateChatProps, 'lastMessage'> {
    return !!this.lastMessage
  }

  static create(
    props: Except<
      SetOptional<WAPrivateChatProps, 'imageUrl' | 'lastMessage'>,
      'isGroup'
    >,
    id: WAEntityID
  ) {
    return new WAPrivateChat(
      {
        ...props,
        isGroup: false,
        imageUrl: props.imageUrl ?? null,
        lastMessage: props.lastMessage ?? null,
      },
      id
    )
  }
}
