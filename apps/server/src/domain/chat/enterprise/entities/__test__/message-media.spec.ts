import { faker } from '@/test/lib/faker'

import { makeMimeType } from '@/test/factories/chat/value-objects/make-mime-type'
import { MessageMedia } from '../message-media'

describe('MessageMedia', () => {
	it('should be able to create', () => {
		const media = MessageMedia.create({
			key: faker.string.uuid(),
			mimeType: makeMimeType(),
			url: faker.image.url(),
		})

		expect(media).toBeTruthy()
	})
})
