import timers from 'node:timers/promises'
import { Client } from 'whatsapp-web.js'

import {
  WWJSInternalEvents,
  WWJSInternalStates,
  WWJSInternalStatus,
} from '../types/wwjs-enums'

type RequestFunction<T> = () => T | Promise<T>

export class WWJSInternalClient extends Client {
  private async wrap<T>(request: RequestFunction<T>) {
    try {
      return await request()
    } catch (error) {
      const err = error as Error
      this.emit(WWJSInternalStates.FAILED, err.message)
    }
  }

  override initialize(): Promise<void> {
    this.on('disconnected', reason => {
      this.emit(WWJSInternalStatus.DISCONNECTED, reason)
    })

    this.on('qr', async code => {
      const state = await this.getState()

      if (!state) {
        this.emit(WWJSInternalStatus.DISCONNECTED, 'UNKNOWN')
        await timers.setTimeout(300)
      }

      if (code.startsWith('undefined')) return
      this.emit(WWJSInternalEvents.QR_CODE, code)
    })

    return this.wrap(async () => {
      this.emit(WWJSInternalStates.STARTING)
      await super.initialize()
      this.emit(WWJSInternalStates.INITIALIZED)
    })
  }

  override destroy(): Promise<void> {
    return this.wrap(async () => {
      await super.destroy()
      this.emit(WWJSInternalStates.STOPPED)
    })
  }

  override logout(): Promise<void> {
    return this.wrap(async () => {
      await super.logout()
      this.emit(WWJSInternalStatus.DISCONNECTED, 'LOGOUT')
    })
  }
}