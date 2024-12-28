import type { User as Output } from '@netzap/entities/users'

import { User } from '@/domain/users/enterprise/entities/user.js'

export class UserPresenter {
  static toOutput(user: User): Output {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      displayName: user.displayName,
      imageUrl: user.imageUrl,
      instances: user.instances.currentItems.map(instanceId =>
        instanceId.toString()
      ),
    }
  }
}
