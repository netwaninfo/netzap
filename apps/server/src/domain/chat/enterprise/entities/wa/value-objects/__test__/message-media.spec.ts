import { makeMimeType } from '@/test/factories/chat/value-objects/make-mime-type.js'
import { faker } from '@/test/lib/faker.js'
import { WAMessageMedia } from '../message-media.js'

describe('WAMessageMedia', () => {
  it('should be able to create', () => {
    const media = WAMessageMedia.create({
      data: faker.string.binary({ length: 5 }),
      mimeType: makeMimeType(),
    })

    expect(media).toBeTruthy()
  })
})
