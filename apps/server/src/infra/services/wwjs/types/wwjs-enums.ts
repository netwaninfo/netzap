export { Events as WWJSEvents } from 'whatsapp-web.js'

export enum WWJSInternalEvents {
  QR_CODE = 'wa:qr',
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
