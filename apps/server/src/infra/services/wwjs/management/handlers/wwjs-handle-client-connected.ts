import { HandleInstanceConnected } from '@/domain/management/application/handlers/handle-instance-connected.js'
import { Handler } from '../../decorators/handler.decorator.js'
import { SubscribeEvent } from '../../decorators/subscribe-event.decorator.js'
import { WWJSEvents } from '../../types/wwjs-enums.js'
import { WWJSHandler, type WWJSListener } from '../../types/wwjs-handler.js'
import { WWJSClient } from '../../wwjs-client.js'

@Handler()
export class WWJSHandleClientConnected implements WWJSHandler {
  constructor(private handleConnected: HandleInstanceConnected) {}

  @SubscribeEvent(WWJSEvents.READY)
  register(client: WWJSClient): WWJSListener {
    return async () => {
      await this.handleConnected.execute({
        instanceId: client.instanceId,
      })
    }
  }
}
