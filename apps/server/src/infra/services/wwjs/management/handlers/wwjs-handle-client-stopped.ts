import { HandleInstanceStopped } from '@/domain/management/application/handlers/handle-instance-stopped'
import { Handler } from '../../decorators/handler.decorator'
import { SubscribeEvent } from '../../decorators/subscribe-event.decorator'
import { WWJSInternalStates } from '../../types/wwjs-enums'
import { WWJSHandler, type WWJSListener } from '../../types/wwjs-handler'
import { WWJSClient } from '../../wwjs-client'

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
