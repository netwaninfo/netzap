import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { WAEntity } from '@/core/entities/wa-entity'
import type { WAEntityID } from '../value-objects/wa-entity-id'

export interface WAContactProps {
  instanceId: UniqueEntityID
  name: string | null
  pushName: string | null
  shortName: string | null
  number: string
  formattedNumber: string
  isGroup: boolean
  imageUrl: string | null
}

export abstract class WAContact<Props extends WAContactProps> extends WAEntity<
  Props,
  WAEntityID
> {
  get instanceId() {
    return this.props.instanceId
  }

  get name() {
    return this.props.name
  }

  get pushName() {
    return this.props.pushName
  }

  get shortName() {
    return this.props.shortName
  }

  get defaultName() {
    const names = [this.name, this.shortName, this.pushName]

    return names.find(name => !!name?.trim()) ?? this.formattedNumber
  }

  get number() {
    return this.props.number
  }

  get formattedNumber() {
    return this.props.formattedNumber
  }

  get imageUrl() {
    return this.props.imageUrl
  }

  get isMe() {
    return this.instanceId.equals(UniqueEntityID.create(this.id.toString()))
  }
}
