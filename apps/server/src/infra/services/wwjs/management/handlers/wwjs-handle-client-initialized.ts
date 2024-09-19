import { HandleInstanceInitialized } from '@/domain/management/application/handlers/handle-instance-initialized'
import { Injectable } from '@nestjs/common'
import { WWJSInternalStates } from '../../types/wwjs-enums'
import { WWJSHandler, WWJSListener } from '../../types/wwjs-handler'
import { WWJSClient } from '../../wwjs-client'
import { WWJSFactory } from '../../wwjs-factory.service'

@Injectable()
export class WWJSHandleClientInitialized implements WWJSHandler {
  constructor(
    private factory: WWJSFactory,
    private handleInitialized: HandleInstanceInitialized
  ) {
    this.factory.addHandler(this)
  }

  event = WWJSInternalStates.INITIALIZED

  register(client: WWJSClient): WWJSListener {
    return async () => {
      await this.handleInitialized.execute({
        instanceId: client.instanceId,
      })
    }
  }
}
