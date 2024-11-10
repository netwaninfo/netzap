import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { SetOptional } from 'type-fest'
import { UserInstanceList } from './user-instance-list'

export interface UserProps {
  name: string
  email: string
  displayName: string
  imageUrl: string
  instances: UserInstanceList
  refId: UniqueEntityID
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get displayName() {
    return this.props.displayName
  }

  get imageUrl() {
    return this.props.imageUrl
  }

  get instances() {
    return this.props.instances
  }

  get refId() {
    return this.props.refId
  }

  static create(
    { ...props }: SetOptional<UserProps, 'instances'>,
    id?: UniqueEntityID
  ) {
    return new User(
      {
        ...props,
        instances: props.instances ?? UserInstanceList.create([]),
      },
      id
    )
  }
}
