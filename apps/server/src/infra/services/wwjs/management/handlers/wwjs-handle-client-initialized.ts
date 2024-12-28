import { HandleInstanceInitialized } from '@/domain/management/application/handlers/handle-instance-initialized.js'
import { Handler } from '../../decorators/handler.decorator.js'
import { SubscribeEvent } from '../../decorators/subscribe-event.decorator.js'
import { WWJSInternalStates } from '../../types/wwjs-enums.js'
import { WWJSHandler, type WWJSListener } from '../../types/wwjs-handler.js'
import { WWJSClient } from '../../wwjs-client.js'

@Handler()
export class WWJSHandleClientInitialized implements WWJSHandler {
  constructor(private handleInitialized: HandleInstanceInitialized) {}

  @SubscribeEvent(WWJSInternalStates.INITIALIZED)
  register(client: WWJSClient): WWJSListener {
    return async () => {
      await this.handleInitialized.execute({
        instanceId: client.instanceId,
      })
    }
  }
}
