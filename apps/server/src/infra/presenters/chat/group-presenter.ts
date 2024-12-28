import type { Group as Output } from '@netzap/entities/chat'

import { Group } from '@/domain/chat/enterprise/entities/group.js'

export class GroupPresenter {
  static toOutput(group: Group): Output {
    return {
      id: group.id.toString(),
      waGroupId: group.waGroupId.toString(),
      imageUrl: group.imageUrl,
      instanceId: group.instanceId.toString(),
      name: group.name,
    }
  }
}
