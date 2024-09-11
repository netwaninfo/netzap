import type { InstanceStatus } from '@netzap/contracts/management'

import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface InstanceProps {
  name: string
  phone: string
  status: InstanceStatus
  attendantId: UniqueEntityID
}

export class Instance extends Entity<InstanceProps> {
  get name() {
    return this.props.name
  }

  get phone() {
    return this.props.phone
  }

  get status() {
    return this.props.status
  }

  get attendantId() {
    return this.props.attendantId
  }

  static create(props: InstanceProps, id?: UniqueEntityID) {
    return new Instance({ ...props }, id)
  }
}
