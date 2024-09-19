import { HandleInstanceQRCodeChange } from '@/domain/management/application/handlers/handle-instance-qr-code-change'
import { Injectable } from '@nestjs/common'
import { WWJSEvents } from '../../types/wwjs-enums'
import { WWJSHandler, WWJSListener } from '../../types/wwjs-handler'
import { WWJSClient } from '../../wwjs-client'
import { WWJSFactory } from '../../wwjs-factory.service'

@Injectable()
export class WWJSHandleClientQRCodeChange implements WWJSHandler {
  constructor(
    private factory: WWJSFactory,
    private handleQRCodeChange: HandleInstanceQRCodeChange
  ) {
    this.factory.addHandler(this)
  }

  event = WWJSEvents.QR_RECEIVED

  register(client: WWJSClient): WWJSListener {
    return async (qrCode: string) => {
      await this.handleQRCodeChange.execute({
        instanceId: client.instanceId,
        qrCode,
      })
    }
  }
}
