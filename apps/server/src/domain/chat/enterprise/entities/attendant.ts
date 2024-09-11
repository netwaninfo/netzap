import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface AttendantProps {
  displayName: string
}

export class Attendant extends Entity<AttendantProps> {
  get displayName() {
    return this.props.displayName
  }

  static create(props: AttendantProps, id?: UniqueEntityID) {
    return new Attendant({ ...props }, id)
  }
}
