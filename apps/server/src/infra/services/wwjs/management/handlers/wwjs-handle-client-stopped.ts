import { HandleInstanceStopped } from '@/domain/management/application/handlers/handle-instance-stopped.js'
import { Handler } from '../../decorators/handler.decorator.js'
import { SubscribeEvent } from '../../decorators/subscribe-event.decorator.js'
import { WWJSInternalStates } from '../../types/wwjs-enums.js'
import { WWJSHandler, type WWJSListener } from '../../types/wwjs-handler.js'
import { WWJSClient } from '../../wwjs-client.js'

@Handler()
export class WWJSHandleClientStopped implements WWJSHandler {
  constructor(private handleStopped: HandleInstanceStopped) {}

  @SubscribeEvent(WWJSInternalStates.STOPPED)
  register(client: WWJSClient): WWJSListener {
    return async () => {
      await this.handleStopped.execute({
        instanceId: client.instanceId,
      })
    }
  }
}
