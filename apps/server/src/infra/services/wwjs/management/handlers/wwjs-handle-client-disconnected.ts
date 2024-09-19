import { HandleInstanceDisconnected } from '@/domain/management/application/handlers/handle-instance-disconnected'
import { Injectable } from '@nestjs/common'
import { WWJSInternalStatus } from '../../types/wwjs-enums'
import { WWJSHandler, WWJSListener } from '../../types/wwjs-handler'
import { WWJSClient } from '../../wwjs-client'
import { WWJSFactory } from '../../wwjs-factory.service'

@Injectable()
export class WWJSHandleClientDisconnected implements WWJSHandler {
  constructor(
    private factory: WWJSFactory,
    private handleDisconnected: HandleInstanceDisconnected
  ) {
    this.factory.addHandler(this)
  }

  event = WWJSInternalStatus.DISCONNECTED

  register(client: WWJSClient): WWJSListener {
    return async () => {
      await this.handleDisconnected.execute({
        instanceId: client.instanceId,
      })
    }
  }
}
