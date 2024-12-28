import { Entity } from '@/core/entities/entity.js'
import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'

export interface UserProps {
  name: string
  email: string
  imageUrl: string
  refId: UniqueEntityID
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get imageUrl() {
    return this.props.imageUrl
  }

  get refId() {
    return this.props.refId
  }

  static create({ ...props }: UserProps, id: UniqueEntityID) {
    return new User({ ...props }, id)
  }
}
