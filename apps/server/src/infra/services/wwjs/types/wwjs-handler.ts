import { WWJSClient } from '../wwjs-client'
import {
  WWJSEvents,
  WWJSInternalStates,
  WWJSInternalStatus,
} from './wwjs-enums'

export type WWJSEvent = WWJSEvents | WWJSInternalStatus | WWJSInternalStates

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type WWJSListener = (...args: any[]) => Promise<void>

export interface WWJSHandler<T = WWJSListener> {
  event: WWJSEvent
  register(waClient: WWJSClient): T
}
