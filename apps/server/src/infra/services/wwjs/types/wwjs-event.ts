import {
  WWJSEvents,
  WWJSInternalEvents,
  WWJSInternalStates,
  WWJSInternalStatus,
} from './wwjs-enums.js'

export type WWJSEvent =
  | WWJSEvents
  | WWJSInternalStatus
  | WWJSInternalStates
  | WWJSInternalEvents
