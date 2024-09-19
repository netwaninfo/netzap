import { HandleInstanceConnected } from '@/domain/management/application/handlers/handle-instance-connected'
import { Injectable } from '@nestjs/common'
import { WWJSEvents } from '../../types/wwjs-enums'
import { WWJSHandler, WWJSListener } from '../../types/wwjs-handler'
import { WWJSClient } from '../../wwjs-client'
import { WWJSFactory } from '../../wwjs-factory.service'

@Injectable()
export class WWJSHandleClientConnected implements WWJSHandler {
  constructor(
    private factory: WWJSFactory,
    private handleConnected: HandleInstanceConnected
  ) {
    this.factory.addHandler(this)
  }

  event = WWJSEvents.READY

  register(client: WWJSClient): WWJSListener {
    return async () => {
      await this.handleConnected.execute({
        instanceId: client.instanceId,
      })
    }
  }
}
