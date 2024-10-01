import type { InstanceState, InstanceStatus } from '@netzap/entities/management'
import type { SetOptional } from 'type-fest'

import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface InstanceProps {
  name: string
  phone: string
  qrCode: string | null
  status: InstanceStatus
  state: InstanceState
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

  get state() {
    return this.props.state
  }

  changeQRCode(qrCode: string) {
    this.set({ qrCode })
  }

  stopped() {
    this.set({ state: 'stopped', qrCode: null })
  }

  starting() {
    this.set({ state: 'starting', qrCode: null })
  }

  initialized() {
    this.set({ state: 'initialized' })
  }

  failed() {
    this.set({ state: 'failed', qrCode: null })
  }

  connected() {
    this.set({ status: 'connected', qrCode: null })
  }

  disconnected() {
    this.set({ status: 'disconnected', qrCode: null })
  }

  static create(
    props: SetOptional<InstanceProps, 'qrCode' | 'status' | 'state'>,
    id?: UniqueEntityID
  ) {
    return new Instance(
      {
        ...props,
        qrCode: props.qrCode ?? null,
        status: props.status ?? 'disconnected',
        state: props.state ?? 'stopped',
      },
      id
    )
  }
}
