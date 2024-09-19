import { Client } from 'whatsapp-web.js'
import { WWJSInternalStates, WWJSInternalStatus } from '../types/wwjs-enums'

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
    return this.wrap(async () => {
      this.emit(WWJSInternalStates.STARTING)
      await this.wrap(() => super.initialize())
      this.emit(WWJSInternalStates.INITIALIZED)

      // const state = await this.getState()
      // if (!state) {
      //   await timers.setTimeout(500)
      //   this.emit(WWJSInternalStatus.DISCONNECTED, 'UNKNOWN')
      // }
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
