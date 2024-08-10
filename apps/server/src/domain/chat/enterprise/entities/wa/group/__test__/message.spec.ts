import { faker } from '@faker-js/faker'

import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id'
import { makeWAMessageID } from '@/test/factories/chat/value-objects/make-wa-message-id'
import { makeWAGroupMessage } from '@/test/factories/chat/wa/make-wa-group-message'
import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact'
import { makeWAMessageMedia } from '@/test/factories/chat/wa/value-objects/make-wa-message-media'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { WAGroupMessage } from '../message'

describe('WAGroupMessage', () => {
	it('should be able to create', () => {
		const waMessage = WAGroupMessage.create(
			{
				ack: 'pending',
				body: faker.lorem.paragraph(),
				waChatId: makeWAEntityID(),
				instanceId: makeUniqueEntityID(),
				isForwarded: faker.datatype.boolean(),
				isFromMe: faker.datatype.boolean(),
				timestamp: Date.now(),
				type: 'text',
				contacts: [makeWAPrivateContact()],
				media: makeWAMessageMedia(),
				quoted: makeWAGroupMessage(),
				author: makeWAPrivateContact(),
				raw: {},
			},
			makeWAMessageID(),
		)

		expect(waMessage).toBeTruthy()
	})
})
