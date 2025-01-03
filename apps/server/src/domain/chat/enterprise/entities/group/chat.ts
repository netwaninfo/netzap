import type { SetNonNullable, SetOptional } from 'type-fest'

import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import type { GroupMessage } from '../../types/message.js'
import { Chat, type ChatProps } from '../chat.js'
import { Group } from '../group.js'

export interface GroupChatProps extends ChatProps {
  group: Group
  lastMessage: GroupMessage | null
}

export class GroupChat extends Chat<GroupChatProps> {
  get group() {
    return this.props.group
  }

  get lastMessage() {
    return this.props.lastMessage
  }

  hasLastMessage(): this is SetNonNullable<GroupChatProps, 'lastMessage'> {
    return !!this.lastMessage
  }

  static create(
    props: SetOptional<GroupChatProps, 'lastMessage' | 'lastInteractionAt'>,
    id?: UniqueEntityID
  ) {
    return new GroupChat(
      {
        ...props,
        lastMessage: props.lastMessage ?? null,
        lastInteractionAt: props.lastInteractionAt ?? null,
      },
      id
    )
  }
}
