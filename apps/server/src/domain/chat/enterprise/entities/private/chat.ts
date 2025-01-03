import type { SetNonNullable, SetOptional } from 'type-fest'

import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import type { PrivateMessage } from '../../types/message.js'
import { Chat, type ChatProps } from '../chat.js'
import { Contact } from '../contact.js'

export interface PrivateChatProps extends ChatProps {
  contact: Contact
  lastMessage: PrivateMessage | null
}

export class PrivateChat extends Chat<PrivateChatProps> {
  get contact() {
    return this.props.contact
  }

  get lastMessage() {
    return this.props.lastMessage
  }

  hasLastMessage(): this is SetNonNullable<PrivateChat, 'lastMessage'> {
    return !!this.lastMessage
  }

  static create(
    props: SetOptional<PrivateChatProps, 'lastMessage' | 'lastInteractionAt'>,
    id?: UniqueEntityID
  ) {
    return new PrivateChat(
      {
        ...props,
        lastMessage: props.lastMessage ?? null,
        lastInteractionAt: props.lastInteractionAt ?? null,
      },
      id
    )
  }
}
