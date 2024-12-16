import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { SetNonNullable } from 'type-fest'
import type { Message } from '../types/message'
import type { WAEntityID } from './value-objects/wa-entity-id'

export interface ChatProps {
  waChatId: WAEntityID
  instanceId: UniqueEntityID
  unreadCount: number
  lastMessage: Message | null
  lastInteractionAt: Date | null
}

export abstract class Chat<Props extends ChatProps> extends Entity<Props> {
  get waChatId() {
    return this.props.waChatId
  }

  get instanceId() {
    return this.props.instanceId
  }

  get unreadCount() {
    return this.props.unreadCount
  }

  get lastInteractionAt() {
    return this.props.lastInteractionAt
  }

  hasLastInteractionAt(): this is SetNonNullable<
    ChatProps,
    'lastInteractionAt'
  > {
    return !!this.lastInteractionAt
  }

  read() {
    this.set({ unreadCount: 0 })
  }

  unread() {
    this.set({ unreadCount: -1 })
  }

  incrementUnread() {
    this.set({ unreadCount: this.unreadCount + 1 })
  }

  setUnreadCount(unreadCount: number) {
    this.set({ unreadCount })
  }

  interact(message: Message): void {
    this.set({
      lastMessage: message,
      lastInteractionAt: message.createdAt,
    })
  }

  override set<T extends Partial<ChatProps>>(newProps: T) {
    this.props = Object.assign({}, this.props, newProps)
  }
}
