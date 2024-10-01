import { Instance } from '@/domain/chat/enterprise/entities/instance'

import { Instance as Output } from '@netzap/entities/chat'

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
