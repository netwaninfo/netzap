import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { UniqueEntityID } from '../unique-entity-id'
import { WAEntity } from '../wa-entity'

interface RawWAEntityProps {
  isTrue?: boolean
}

class RawWAEntity extends WAEntity<RawWAEntityProps, UniqueEntityID> {
  get isTrue() {
    return this.props.isTrue
  }

  static create(props: RawWAEntityProps, id: UniqueEntityID) {
    return new RawWAEntity(props, id)
  }
}

describe('Entity', () => {
  it('should be able to get id', () => {
    const entity = RawWAEntity.create({}, makeUniqueEntityID())

    expect(entity.id).toBeInstanceOf(UniqueEntityID)
  })

  it('should be able to entity equals it self', () => {
    const entity = RawWAEntity.create({}, makeUniqueEntityID())

    expect(entity.equals(entity)).toBe(true)
  })
})
