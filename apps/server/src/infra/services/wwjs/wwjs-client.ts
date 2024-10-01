import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'
import { InstanceState, InstanceStatus } from '@netzap/entities/management'
import { SetOptional } from 'type-fest'
import { WWJSInternalClient } from './internal/client'
import {
  WWJSEvents,
  WWJSInternalStates,
  WWJSInternalStatus,
} from './types/wwjs-enums'
import { WWJSEvent } from './types/wwjs-event'
import { WWJSHandler } from './types/wwjs-handler'

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

  addHandlers(event: WWJSEvent, handler: WWJSHandler) {
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
