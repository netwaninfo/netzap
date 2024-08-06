import { faker } from '@faker-js/faker'

import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id'
import { makeWAMessageID } from '@/test/factories/chat/value-objects/make-wa-message-id'
import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact'
import { makeWAPrivateMessage } from '@/test/factories/chat/wa/make-wa-private-message'
import { makeWAMessageMedia } from '@/test/factories/chat/wa/value-objects/make-wa-message-media'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { WAPrivateMessage } from '../message'

describe('WAPrivateMessage', () => {
	it('should be able to create', () => {
		const waMessage = WAPrivateMessage.create(
			{
				ack: 'pending',
				body: faker.lorem.paragraph(),
				chatId: makeWAEntityID(),
				deviceId: makeUniqueEntityID(),
				isForwarded: faker.datatype.boolean(),
				isFromMe: faker.datatype.boolean(),
				timestamp: Date.now(),
				type: 'text',
				contacts: [makeWAPrivateContact()],
				media: makeWAMessageMedia(),
				quoted: makeWAPrivateMessage(),
			},
			makeWAMessageID(),
		)

		expect(waMessage).toBeTruthy()
	})
})
