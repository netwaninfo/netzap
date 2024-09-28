import { HandleInstanceFailed } from '@/domain/management/application/handlers/handle-instance-failed'
import { Handler } from '../../decorators/handler.decorator'
import { SubscribeEvent } from '../../decorators/subscribe-event.decorator'
import { WWJSInternalStates } from '../../types/wwjs-enums'
import { WWJSHandler, type WWJSListener } from '../../types/wwjs-handler'
import { WWJSClient } from '../../wwjs-client'

@Handler()
export class WWJSHandleClientFailed implements WWJSHandler {
  constructor(private handleFailed: HandleInstanceFailed) {}

  @SubscribeEvent(WWJSInternalStates.FAILED)
  register(client: WWJSClient): WWJSListener {
    return async () => {
      await this.handleFailed.execute({
        instanceId: client.instanceId,
      })
    }
  }
}
