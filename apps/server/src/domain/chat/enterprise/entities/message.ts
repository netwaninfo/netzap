import { Entity } from '@/core/entities/entity.js'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import type {
  ChatType,
  MessageStatus,
  MessageType,
} from '@netzap/entities/chat'
import type { WAEntityID } from './value-objects/wa-entity-id.js'
import type { WAMessageID } from './value-objects/wa-message-id.js'

import type { SetNonNullable } from 'type-fest'

export interface MessageProps<Quoted = unknown> {
  waMessageId: WAMessageID
  waChatId: WAEntityID
  chatType: ChatType
  instanceId: UniqueEntityID
  chatId: UniqueEntityID
  quoted: Quoted | null
  status: MessageStatus
  type: MessageType
  isForwarded: boolean
  isFromMe: boolean
  createdAt: Date
  sentBy: UniqueEntityID | null
}

export abstract class Message<
  Props extends MessageProps,
> extends Entity<Props> {
  get waMessageId() {
    return this.props.waMessageId
  }

  get waChatId() {
    return this.props.waChatId
  }

  get instanceId() {
    return this.props.instanceId
  }

  get chatId() {
    return this.props.chatId
  }

  get status() {
    return this.props.status
  }

  setStatus(status: MessageStatus) {
    this.set({ status })
  }

  get isForwarded() {
    return this.props.isForwarded
  }

  get isFromMe() {
    return this.props.isFromMe
  }

  get createdAt() {
    return this.props.createdAt
  }

  get sentBy() {
    return this.props.sentBy
  }

  hasSentBy(): this is SetNonNullable<MessageProps, 'sentBy'> {
    return !!this.sentBy
  }

  protected override set<T extends Partial<MessageProps>>(newProps: T) {
    this.props = Object.assign({}, this.props, newProps)
  }
}
