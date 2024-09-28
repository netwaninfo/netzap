import { HandleInstanceQRCodeChange } from '@/domain/management/application/handlers/handle-instance-qr-code-change'
import { Handler } from '../../decorators/handler.decorator'
import { SubscribeEvent } from '../../decorators/subscribe-event.decorator'
import { WWJSInternalEvents } from '../../types/wwjs-enums'
import { WWJSHandler, type WWJSListener } from '../../types/wwjs-handler'
import { WWJSClient } from '../../wwjs-client'

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
