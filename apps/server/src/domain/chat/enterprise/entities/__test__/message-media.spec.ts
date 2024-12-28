import { faker } from '@/test/lib/faker.js'

import { makeMimeType } from '@/test/factories/chat/value-objects/make-mime-type.js'
import { MessageMedia } from '../message-media.js'

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
