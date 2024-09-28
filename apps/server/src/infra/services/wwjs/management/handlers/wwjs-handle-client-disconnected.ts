import { HandleInstanceDisconnected } from '@/domain/management/application/handlers/handle-instance-disconnected'
import { Handler } from '../../decorators/handler.decorator'
import { SubscribeEvent } from '../../decorators/subscribe-event.decorator'
import { WWJSInternalStatus } from '../../types/wwjs-enums'
import { WWJSHandler, type WWJSListener } from '../../types/wwjs-handler'
import { WWJSClient } from '../../wwjs-client'

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
