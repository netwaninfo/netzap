import { makeMimeType } from '@/test/factories/chat/value-objects/make-mime-type'
import { faker } from '@/test/lib/faker'
import { StorageObject } from '../storage-object'

describe('StorageObject', () => {
	it('should be able to create', () => {
		const storageObject = StorageObject.create({
			mimeType: makeMimeType(),
			path: faker.system.directoryPath(),
			url: faker.image.url(),
		})

		expect(storageObject).toBeTruthy()
	})
})
