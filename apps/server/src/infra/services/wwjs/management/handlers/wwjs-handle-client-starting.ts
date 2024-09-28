import { HandleInstanceStarting } from '@/domain/management/application/handlers/handle-instance-starting'
import { Handler } from '../../decorators/handler.decorator'
import { SubscribeEvent } from '../../decorators/subscribe-event.decorator'
import { WWJSInternalStates } from '../../types/wwjs-enums'
import { WWJSHandler, type WWJSListener } from '../../types/wwjs-handler'
import { WWJSClient } from '../../wwjs-client'

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
