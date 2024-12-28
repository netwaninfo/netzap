import type { InstanceState, InstanceStatus } from '@netzap/entities/management'

import { Entity } from '@/core/entities/entity.js'
import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'

export interface InstanceProps {
  name: string
  phone: string
  status: InstanceStatus
  state: InstanceState
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

  get state() {
    return this.props.state
  }

  get attendantId() {
    return this.props.attendantId
  }

  static create(props: InstanceProps, id?: UniqueEntityID) {
    return new Instance({ ...props }, id)
  }
}
