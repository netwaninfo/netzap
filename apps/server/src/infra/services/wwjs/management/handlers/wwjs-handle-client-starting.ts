import { HandleInstanceStarting } from '@/domain/management/application/handlers/handle-instance-starting.js'
import { Handler } from '../../decorators/handler.decorator.js'
import { SubscribeEvent } from '../../decorators/subscribe-event.decorator.js'
import { WWJSInternalStates } from '../../types/wwjs-enums.js'
import { WWJSHandler, type WWJSListener } from '../../types/wwjs-handler.js'
import { WWJSClient } from '../../wwjs-client.js'

@Handler()
export class WWJSHandleClientStarting implements WWJSHandler {
  constructor(private handleStarting: HandleInstanceStarting) {}

  @SubscribeEvent(WWJSInternalStates.STARTING)
  register(client: WWJSClient): WWJSListener {
    return async () => {
      await this.handleStarting.execute({
        instanceId: client.instanceId,
      })
    }
  }
}
