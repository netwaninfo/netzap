import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Message } from '../types/message'
import type { WAEntityID } from './value-objects/wa-entity-id'

export interface ChatProps {
  waChatId: WAEntityID
  instanceId: UniqueEntityID
  unreadCount: number
  lastMessage: Message | null
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

  read() {
    this.set({ unreadCount: 0 })
  }

  unread() {
    this.set({ unreadCount: -1 })
  }

  interact(message: Message): void {
    this.set({ lastMessage: message })
  }

  protected override set<T extends Partial<ChatProps>>(newProps: T) {
    this.props = Object.assign({}, this.props, newProps)
  }
}
