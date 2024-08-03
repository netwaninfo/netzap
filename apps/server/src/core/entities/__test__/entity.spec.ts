import { ObjectId } from '@/core/identifiers/object-id'
import { Entity } from '../entity'

interface RawEntityProps {
	isTrue?: boolean
}

class RawEntity extends Entity<RawEntityProps> {
	get isTrue() {
		return this.props.isTrue
	}

	static create(props: RawEntityProps, id?: string) {
		return new RawEntity(props, ObjectId.create(id))
	}
}

describe('Entity', () => {
	it('should be able to get id', () => {
		const entity = RawEntity.create({})

		expect(entity.id).toBeInstanceOf(ObjectId)
	})

	it('should be able to entity equals it self', () => {
		const entity = RawEntity.create({})

		expect(entity.equals(entity)).toBe(true)
	})
})
