import { randomUUID } from 'node:crypto'
import { ObjectId } from '@/core/identifiers/object-id'
import { Identifier } from '../identifier'

class RawIdentifier extends Identifier {
	static create(id?: string) {
		return new RawIdentifier(id ?? randomUUID())
	}
}

describe('Identifier', () => {
	it('should be able get string value', () => {
		const identifier = RawIdentifier.create()

		expect(identifier.toString()).toEqual(expect.any(String))
	})

	it('should be able to equals it self', () => {
		const identifier = RawIdentifier.create()

		expect(identifier.equals(identifier)).toBe(true)
	})
})
