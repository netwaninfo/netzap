import { makeMimeType } from '@/test/factories/chat/value-objects/make-mime-type'
import { faker } from '@faker-js/faker'
import { WAMessageMedia } from '../message-media'

describe('WAMessageMedia', () => {
  it('should be able to create', () => {
    const media = WAMessageMedia.create({
      data: faker.string.binary({ length: 5 }),
      mimeType: makeMimeType(),
    })

    expect(media).toBeTruthy()
  })
})
