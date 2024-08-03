import { faker } from '@faker-js/faker'

import { MimeType } from '../mime-type'

describe('MimeType', () => {
	it('should be able to create', () => {
		const mimetype = MimeType.create(faker.system.mimeType())

		expect(mimetype).toBeTruthy()
	})

	it('should be able to createFromFilename', () => {
		const mimetype = MimeType.createFromFilename(faker.system.fileName())

		expect(mimetype).toBeTruthy()
	})

	it('should be able to get extension', () => {
		const mimetype = MimeType.create('text/plain')

		expect(mimetype.extension()).toBe('txt')
	})

	it('should be able to format to string', () => {
		const mime = faker.system.mimeType()
		const mimetype = MimeType.create(mime)

		expect(mimetype.toString()).toBe(mime)
	})
})
