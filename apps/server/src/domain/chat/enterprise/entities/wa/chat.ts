import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { WAEntity } from '@/core/entities/wa-entity.js'
import type { SetRequired } from 'type-fest'
import type { WAEntityID } from '../value-objects/wa-entity-id.js'

export interface WAChatProps {
  instanceId: UniqueEntityID
  name: string
  timestamp?: number
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

  hasTimestamp(): this is SetRequired<WAChatProps, 'timestamp'> {
    return !!this.timestamp
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
