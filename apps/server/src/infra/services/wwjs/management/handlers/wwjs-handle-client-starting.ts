import { HandleInstanceStarting } from '@/domain/management/application/handlers/handle-instance-starting'
import { Injectable } from '@nestjs/common'
import { WWJSInternalStates } from '../../types/wwjs-enums'
import { WWJSHandler, WWJSListener } from '../../types/wwjs-handler'
import { WWJSClient } from '../../wwjs-client'
import { WWJSFactory } from '../../wwjs-factory.service'

@Injectable()
export class WWJSHandleClientStarting implements WWJSHandler {
  constructor(
    private factory: WWJSFactory,
    private handleStarting: HandleInstanceStarting
  ) {
    this.factory.addHandler(this)
  }

  event = WWJSInternalStates.STARTING

  register(client: WWJSClient): WWJSListener {
    return async () => {
      await this.handleStarting.execute({
        instanceId: client.instanceId,
      })
    }
  }
}
