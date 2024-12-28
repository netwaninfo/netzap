import { Entity } from '../entity.js'
import { UniqueEntityID } from '../unique-entity-id.js'

interface RawEntityProps {
  isTrue?: boolean
}

class RawEntity extends Entity<RawEntityProps> {
  get isTrue() {
    return this.props.isTrue
  }

  static create(props: RawEntityProps, id?: UniqueEntityID) {
    return new RawEntity(props, id)
  }
}

describe('Entity', () => {
  it('should be able to get id', () => {
    const entity = RawEntity.create({})

    expect(entity.id).toBeInstanceOf(UniqueEntityID)
  })

  it('should be able to entity equals it self', () => {
    const entity = RawEntity.create({})

    expect(entity.equals(entity)).toBe(true)
  })
})
