import type { InstanceState, InstanceStatus } from '@netzap/entities/management'
import type { SetOptional } from 'type-fest'

import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { ValueObject } from '@/core/entities/value-object.js'
import { WWJSInternalClient } from './internal/client.js'
import {
  WWJSEvents,
  WWJSInternalStates,
  WWJSInternalStatus,
} from './types/wwjs-enums.js'
import type { WWJSEvent } from './types/wwjs-event.js'
import { WWJSHandler } from './types/wwjs-handler.js'

export interface WWJSClientProps {
  instanceId: UniqueEntityID
  raw: WWJSInternalClient
  status: InstanceStatus
  state: InstanceState
}

type EventStatesArrayMapper = [WWJSInternalStates, InstanceState][]

const STATES_MAPPER: EventStatesArrayMapper = [
  [WWJSInternalStates.STOPPED, 'stopped'],
  [WWJSInternalStates.FAILED, 'failed'],
  [WWJSInternalStates.STARTING, 'starting'],
  [WWJSInternalStates.INITIALIZED, 'initialized'],
]

type EventStatusArrayMapper = [
  WWJSInternalStatus | WWJSEvents,
  InstanceStatus,
][]

const STATUS_MAPPER: EventStatusArrayMapper = [
  [WWJSEvents.READY, 'connected'],
  [WWJSInternalStatus.DISCONNECTED, 'disconnected'],
]

export class WWJSClient extends ValueObject<WWJSClientProps> {
  get instanceId() {
    return this.props.instanceId
  }

  get raw() {
    return this.props.raw
  }

  get status() {
    return this.props.status
  }

  get state() {
    return this.props.state
  }

  init() {
    for (const [event, state] of STATES_MAPPER) {
      this.raw.on(event, () => this.set({ state }))
    }

    for (const [event, status] of STATUS_MAPPER) {
      this.raw.on(event, () => this.set({ status }))
    }

    return this.raw.initialize()
  }

  close() {
    return this.raw.destroy()
  }

  logout() {
    return this.raw.logout()
  }

  isAvailable() {
    return this.status === 'connected' && this.state === 'initialized'
  }

  addHandler(event: WWJSEvent, handler: WWJSHandler) {
    this.raw.on(event, handler.register(this))
  }

  static create(props: SetOptional<WWJSClientProps, 'status' | 'state'>) {
    return new WWJSClient({
      ...props,
      status: props.status ?? 'disconnected',
      state: props.state ?? 'stopped',
    })
  }
}
