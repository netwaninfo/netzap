import WWJS from 'whatsapp-web.js'

type WWJSEvents = WWJS.Events
type WWJSMessageACK = WWJS.MessageAck
type WWJSMessageTypes = WWJS.MessageTypes

const {
  Events: WWJSEvents,
  MessageAck: WWJSMessageACK,
  MessageTypes: WWJSMessageTypes,
} = WWJS

export { WWJSEvents, WWJSMessageACK, WWJSMessageTypes }

export enum WWJSInternalEvents {
  QR_CODE = 'wa:qr',
  CHAT_UNREAD_COUNT = 'unread_count',
}

export enum WWJSInternalStates {
  FAILED = 'wa:failed',
  STOPPED = 'wa:stopped',
  STARTING = 'wa:starting',
  INITIALIZED = 'wa:initialized',
}

export enum WWJSInternalStatus {
  DISCONNECTED = 'wa:disconnected',
}
