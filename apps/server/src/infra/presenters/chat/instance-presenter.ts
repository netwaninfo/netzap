import { Instance } from '@/domain/chat/enterprise/entities/instance'

import { Instance as HttpInstance } from '@netzap/contracts/chat'

export class InstancePresenter {
  static toHttp(instance: Instance): HttpInstance {
    return {
      id: instance.id.toString(),
      name: instance.name,
      phone: instance.phone,
      status: instance.status,
    }
  }
}
