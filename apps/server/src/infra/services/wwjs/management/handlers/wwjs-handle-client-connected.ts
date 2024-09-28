import { HandleInstanceConnected } from '@/domain/management/application/handlers/handle-instance-connected'
import { Handler } from '../../decorators/handler.decorator'
import { SubscribeEvent } from '../../decorators/subscribe-event.decorator'
import { WWJSEvents } from '../../types/wwjs-enums'
import { WWJSHandler, type WWJSListener } from '../../types/wwjs-handler'
import { WWJSClient } from '../../wwjs-client'

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
