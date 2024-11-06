import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface UserProps {
  name: string
  email: string
  refId: UniqueEntityID
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get refId() {
    return this.props.refId
  }

  static create({ ...props }: UserProps, id: UniqueEntityID) {
    return new User({ ...props }, id)
  }
}
