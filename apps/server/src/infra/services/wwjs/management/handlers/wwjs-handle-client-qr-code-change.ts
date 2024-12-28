import { HandleInstanceQRCodeChange } from '@/domain/management/application/handlers/handle-instance-qr-code-change.js'
import { Handler } from '../../decorators/handler.decorator.js'
import { SubscribeEvent } from '../../decorators/subscribe-event.decorator.js'
import { WWJSInternalEvents } from '../../types/wwjs-enums.js'
import { WWJSHandler, type WWJSListener } from '../../types/wwjs-handler.js'
import { WWJSClient } from '../../wwjs-client.js'

@Handler()
export class WWJSHandleClientQRCodeChange implements WWJSHandler {
  constructor(private handleQRCodeChange: HandleInstanceQRCodeChange) {}

  @SubscribeEvent(WWJSInternalEvents.QR_CODE)
  register(client: WWJSClient): WWJSListener {
    return async (qrCode: string) => {
      await this.handleQRCodeChange.execute({
        instanceId: client.instanceId,
        qrCode,
      })
    }
  }
}
