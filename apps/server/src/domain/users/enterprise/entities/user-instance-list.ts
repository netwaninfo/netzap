import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { WatchedList } from '@/core/entities/watched-list'

export class UserInstanceList extends WatchedList<UniqueEntityID> {
  compareItems(a: UniqueEntityID, b: UniqueEntityID): boolean {
    return a.equals(b)
  }

  static create(initialItems: UniqueEntityID[]) {
    return new UserInstanceList(initialItems)
  }
}
