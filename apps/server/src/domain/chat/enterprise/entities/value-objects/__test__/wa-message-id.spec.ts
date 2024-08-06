import { faker } from '@/test/lib/faker'

import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id'
import { WAMessageID } from '../wa-message-id'

describe('WAMessageID', () => {
	it('should be able to create', () => {
		const messageId = WAMessageID.create({
			entityId: makeWAEntityID(),
			isFromMe: faker.datatype.boolean(),
			ref: faker.database.mongodbObjectId(),
			owner: faker.string.uuid(),
		})

		expect(messageId).toBeTruthy()
		expect(messageId.hasOwner()).toBe(true)
	})

	it('should be able to entity equals it self', () => {
		const messageId = WAMessageID.create({
			entityId: makeWAEntityID(),
			isFromMe: faker.datatype.boolean(),
			ref: faker.database.mongodbObjectId(),
			owner: faker.string.uuid(),
		})

		expect(messageId.equals(messageId)).toBe(true)
	})

	it('should be able to createFromString', () => {
		const entityId = makeWAEntityID().toString()
		const ref = faker.database.mongodbObjectId()

		const messageId = WAMessageID.createFromString(`true_${entityId}_${ref}`)
		expect(messageId).toBeTruthy()
	})

	it('should be able to format to string', () => {
		const messageId = WAMessageID.create({
			entityId: makeWAEntityID({ node: 'c.us' }),
			isFromMe: true,
			ref: faker.database.mongodbObjectId(),
		})

		expect(messageId.toString()).toEqual(expect.any(String))
		expect(messageId.toString()).toMatch(/true_[0-9]{13}@c\.us_[0-9a-fA-F]{24}/)
	})
})
