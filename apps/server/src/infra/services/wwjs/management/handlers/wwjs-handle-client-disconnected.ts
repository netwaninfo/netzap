import { HandleInstanceDisconnected } from '@/domain/management/application/handlers/handle-instance-disconnected.js'
import { Handler } from '../../decorators/handler.decorator.js'
import { SubscribeEvent } from '../../decorators/subscribe-event.decorator.js'
import { WWJSInternalStatus } from '../../types/wwjs-enums.js'
import { WWJSHandler, type WWJSListener } from '../../types/wwjs-handler.js'
import { WWJSClient } from '../../wwjs-client.js'

@Handler()
export class WWJSHandleClientDisconnected implements WWJSHandler {
  constructor(private handleDisconnected: HandleInstanceDisconnected) {}

  @SubscribeEvent(WWJSInternalStatus.DISCONNECTED)
  register(client: WWJSClient): WWJSListener {
    return async () => {
      await this.handleDisconnected.execute({
        instanceId: client.instanceId,
      })
    }
  }
}
