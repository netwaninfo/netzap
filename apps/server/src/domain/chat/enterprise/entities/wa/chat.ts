import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { WAEntity } from '@/core/entities/wa-entity'
import type { WAEntityID } from '../value-objects/wa-entity-id'

export interface WAChatProps {
  instanceId: UniqueEntityID
  name: string
  timestamp: number
  unreadCount: number
  imageUrl: string | null
  isGroup: boolean
}

export abstract class WAChat<Props extends WAChatProps> extends WAEntity<
  Props,
  WAEntityID
> {
  get instanceId() {
    return this.props.instanceId
  }

  get name() {
    return this.props.name
  }

  get timestamp() {
    return this.props.timestamp
  }

  get unreadCount() {
    return this.props.unreadCount
  }

  get imageUrl() {
    return this.props.imageUrl
  }

  get ref() {
    return `${this.instanceId.toString()}/${this.id.toString()}`
  }
}
