import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'
import { InstanceState, InstanceStatus } from '@netzap/contracts/management'
import { SetOptional } from 'type-fest'
import { WWJSInternalClient } from './internal/client'
import {
  WWJSEvents,
  WWJSInternalStates,
  WWJSInternalStatus,
} from './types/wwjs-enums'
import { WWJSHandler } from './types/wwjs-handler'

export interface WWJSClientProps {
  instanceId: UniqueEntityID
  raw: WWJSInternalClient
  status: InstanceStatus
  state: InstanceState
}

const WWJS_EVENTS_STATES_MAPPER = [
  [WWJSInternalStates.STOPPED, 'stopped'],
  [WWJSInternalStates.FAILED, 'failed'],
  [WWJSInternalStates.STARTING, 'starting'],
  [WWJSInternalStates.INITIALIZED, 'initialized'],
]

const WWJS_EVENTS_STATUS_MAPPER = [
  [WWJSEvents.READY, 'connected'],
  [WWJSInternalStatus.DISCONNECTED, 'disconnected'],
]

export class WWJSClient extends ValueObject<WWJSClientProps> {
  protected constructor(props: WWJSClientProps) {
    super(props)

    for (const mapper of WWJS_EVENTS_STATES_MAPPER) {
      const [event, state] = mapper as [WWJSInternalStates, InstanceState]
      this.raw.on(event, () => this.set({ state }))
    }

    for (const mapper of WWJS_EVENTS_STATUS_MAPPER) {
      const [event, status] = mapper as [WWJSInternalStates, InstanceStatus]
      this.raw.on(event, () => this.set({ status }))
    }
  }

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

  addHandlers(handlers: WWJSHandler[]) {
    for (const handler of handlers) {
      this.raw.on(handler.event, handler.register(this))
    }
  }

  static create(props: SetOptional<WWJSClientProps, 'status' | 'state'>) {
    return new WWJSClient({
      ...props,
      status: props.status ?? 'disconnected',
      state: props.state ?? 'stopped',
    })
  }
}
