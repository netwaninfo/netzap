import { UniqueEntityID } from './unique-entity-id.js'

export abstract class Entity<Props> {
  private _id: UniqueEntityID
  protected props: Props

  protected constructor(props: Props, id?: UniqueEntityID) {
    this.props = props
    this._id = id ?? UniqueEntityID.create()
  }

  protected set<T extends Partial<Props>>(newProps: T) {
    this.props = Object.assign({}, this.props, newProps)
  }

  get id() {
    return this._id
  }

  set id(newId: UniqueEntityID) {
    this._id = newId
  }

  equals(entity: Entity<unknown>) {
    if (entity === this) {
      return true
    }

    if (entity.id.equals(this._id)) {
      return true
    }

    return false
  }
}
