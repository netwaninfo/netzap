import {
  WWJSEvents,
  WWJSInternalEvents,
  WWJSInternalStates,
  WWJSInternalStatus,
} from './wwjs-enums'

export type WWJSEvent =
  | WWJSEvents
  | WWJSInternalStatus
  | WWJSInternalStates
  | WWJSInternalEvents
