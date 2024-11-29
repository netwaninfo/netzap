import { Group } from '@/domain/chat/enterprise/entities/group'
import { Group as Output } from '@netzap/entities/chat'

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
