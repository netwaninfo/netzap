import type { Instance as Output } from '@netzap/entities/chat'

import { Instance } from '@/domain/chat/enterprise/entities/instance.js'

export class InstancePresenter {
  static toOutput(instance: Instance): Output {
    return {
      id: instance.id.toString(),
      name: instance.name,
      phone: instance.phone,
      status: instance.status,
      state: instance.state,
    }
  }
}
