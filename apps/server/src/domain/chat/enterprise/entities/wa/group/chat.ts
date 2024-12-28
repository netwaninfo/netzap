import type { Except, SetNonNullable, SetOptional } from 'type-fest'
import type { WAEntityID } from '../../value-objects/wa-entity-id.js'
import { WAChat, type WAChatProps } from '../chat.js'
import type { WAPrivateContact } from '../private/contact.js'
import type { WAGroupContact } from './contact.js'
import type { WAGroupMessage } from './message.js'

export interface WAGroupChatProps extends WAChatProps {
  isGroup: true
  contact: WAGroupContact
  participants: WAPrivateContact[]
  lastMessage: WAGroupMessage | null
}

export class WAGroupChat extends WAChat<WAGroupChatProps> {
  get isGroup() {
    return this.props.isGroup
  }

  get contact() {
    return this.props.contact
  }

  get lastMessage() {
    return this.props.lastMessage
  }

  hasLastMessage(): this is SetNonNullable<WAGroupChatProps, 'lastMessage'> {
    return !!this.lastMessage
  }

  get participants() {
    return this.props.participants
  }

  static create(
    props: Except<
      SetOptional<WAGroupChatProps, 'imageUrl' | 'lastMessage'>,
      'isGroup'
    >,
    id: WAEntityID
  ) {
    return new WAGroupChat(
      {
        ...props,
        isGroup: true,
        imageUrl: props.imageUrl ?? null,
        lastMessage: props.lastMessage ?? null,
      },
      id
    )
  }
}
