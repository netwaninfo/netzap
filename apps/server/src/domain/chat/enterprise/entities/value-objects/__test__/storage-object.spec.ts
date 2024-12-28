import { makeMimeType } from '@/test/factories/chat/value-objects/make-mime-type.js'
import { faker } from '@/test/lib/faker.js'
import { StorageObject } from '../storage-object.js'

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
