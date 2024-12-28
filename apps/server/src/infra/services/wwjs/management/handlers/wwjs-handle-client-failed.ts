import { HandleInstanceFailed } from '@/domain/management/application/handlers/handle-instance-failed.js'
import { Handler } from '../../decorators/handler.decorator.js'
import { SubscribeEvent } from '../../decorators/subscribe-event.decorator.js'
import { WWJSInternalStates } from '../../types/wwjs-enums.js'
import { WWJSHandler, type WWJSListener } from '../../types/wwjs-handler.js'
import { WWJSClient } from '../../wwjs-client.js'

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
