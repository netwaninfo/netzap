import { HandleInstanceInitialized } from '@/domain/management/application/handlers/handle-instance-initialized'
import { Handler } from '../../decorators/handler.decorator'
import { SubscribeEvent } from '../../decorators/subscribe-event.decorator'
import { WWJSInternalStates } from '../../types/wwjs-enums'
import { WWJSHandler, type WWJSListener } from '../../types/wwjs-handler'
import { WWJSClient } from '../../wwjs-client'

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
