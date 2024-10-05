export {
  Events as WWJSEvents,
  MessageAck as WWJSMessageACK,
  MessageTypes as WWJSMessageTypes,
} from 'whatsapp-web.js'

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
