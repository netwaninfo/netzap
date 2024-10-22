import timers from 'node:timers/promises'
import { Client } from 'whatsapp-web.js'

import { RequestFunction } from '../../shared/types/request-function'
import {
  WWJSInternalEvents,
  WWJSInternalStates,
  WWJSInternalStatus,
} from '../types/wwjs-enums'
export class WWJSInternalClient extends Client {
  private async runSafely<T>(request: RequestFunction<T>) {
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

    return this.runSafely(async () => {
      this.emit(WWJSInternalStates.STARTING)
      await super.initialize()
      this.emit(WWJSInternalStates.INITIALIZED)
    })
  }

  override destroy(): Promise<void> {
    return this.runSafely(async () => {
      await super.destroy()
      this.emit(WWJSInternalStates.STOPPED)
    })
  }

  override logout(): Promise<void> {
    return this.runSafely(async () => {
      await super.logout()
      this.emit(WWJSInternalStatus.DISCONNECTED, 'LOGOUT')
    })
  }
}
