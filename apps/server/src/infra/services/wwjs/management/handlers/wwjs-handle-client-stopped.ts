import { HandleInstanceStopped } from '@/domain/management/application/handlers/handle-instance-stopped'
import { Injectable } from '@nestjs/common'
import { WWJSInternalStates } from '../../types/wwjs-enums'
import { WWJSHandler, WWJSListener } from '../../types/wwjs-handler'
import { WWJSClient } from '../../wwjs-client'
import { WWJSFactory } from '../../wwjs-factory.service'

@Injectable()
export class WWJSHandleClientStopped implements WWJSHandler {
  constructor(
    private factory: WWJSFactory,
    private handleStopped: HandleInstanceStopped
  ) {
    this.factory.addHandler(this)
  }

  event = WWJSInternalStates.STOPPED

  register(client: WWJSClient): WWJSListener {
    return async () => {
      await this.handleStopped.execute({
        instanceId: client.instanceId,
      })
    }
  }
}
