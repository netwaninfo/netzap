import type { SetOptional } from 'type-fest'

import { Entity } from '@/core/entities/entity.js'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import type { WAEntityID } from './value-objects/wa-entity-id.js'

export interface GroupProps {
  waGroupId: WAEntityID
  instanceId: UniqueEntityID
  name: string
  imageUrl: string | null
}

export class Group extends Entity<GroupProps> {
  get waGroupId() {
    return this.props.waGroupId
  }

  get instanceId() {
    return this.props.instanceId
  }

  get name() {
    return this.props.name
  }

  get imageUrl() {
    return this.props.imageUrl
  }

  static create(
    props: SetOptional<GroupProps, 'imageUrl'>,
    id?: UniqueEntityID
  ) {
    return new Group(
      {
        ...props,
        imageUrl: props.imageUrl ?? null,
      },
      id
    )
  }
}
