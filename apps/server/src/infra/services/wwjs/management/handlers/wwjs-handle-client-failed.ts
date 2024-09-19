import { HandleInstanceFailed } from '@/domain/management/application/handlers/handle-instance-failed'
import { Injectable } from '@nestjs/common'
import { WWJSInternalStates } from '../../types/wwjs-enums'
import { WWJSHandler, WWJSListener } from '../../types/wwjs-handler'
import { WWJSClient } from '../../wwjs-client'
import { WWJSFactory } from '../../wwjs-factory.service'

@Injectable()
export class WWJSHandleClientFailed implements WWJSHandler {
  constructor(
    private factory: WWJSFactory,
    private handleFailed: HandleInstanceFailed
  ) {
    this.factory.addHandler(this)
  }

  event = WWJSInternalStates.FAILED

  register(client: WWJSClient): WWJSListener {
    return async () => {
      await this.handleFailed.execute({
        instanceId: client.instanceId,
      })
    }
  }
}
