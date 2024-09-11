import type { InstanceStatus } from '@netzap/contracts/management'
import type { SetOptional } from 'type-fest'

import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface InstanceProps {
  name: string
  phone: string
  qrCode: string | null
  status: InstanceStatus
}

export class Instance extends Entity<InstanceProps> {
  get name() {
    return this.props.name
  }

  get phone() {
    return this.props.phone
  }

  get qrCode() {
    return this.props.qrCode
  }

  get status() {
    return this.props.status
  }

  stopped() {
    this.set({ status: 'stopped', qrCode: null })
  }

  starting() {
    this.set({ status: 'starting', qrCode: null })
  }

  initialized(qrCode: string) {
    this.set({ status: 'initialized', qrCode })
  }

  failed() {
    this.set({ status: 'failed', qrCode: null })
  }

  connected() {
    this.set({ status: 'connected', qrCode: null })
  }

  disconnected() {
    this.set({ status: 'disconnected', qrCode: null })
  }

  static create(
    props: SetOptional<InstanceProps, 'qrCode' | 'status'>,
    id?: UniqueEntityID
  ) {
    return new Instance(
      {
        ...props,
        qrCode: props.qrCode ?? null,
        status: props.status ?? 'stopped',
      },
      id
    )
  }
}
