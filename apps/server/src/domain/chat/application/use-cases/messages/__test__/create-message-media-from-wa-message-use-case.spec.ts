import { makeWAPrivateMessage } from '@/test/factories/chat/wa/make-wa-private-message.js'
import { makeWAMessageMedia } from '@/test/factories/chat/wa/value-objects/make-wa-message-media.js'
import { FakeStorageService } from '@/test/services/chat/fake-storage-service.js'
import { CreateMessageMediaFromWAMessageUseCase } from '../create-message-media-from-wa-message-use-case.js'

describe('CreateMessageMediaFromWAMessageUseCase', () => {
  let storageService: FakeStorageService

  let sut: CreateMessageMediaFromWAMessageUseCase

  beforeEach(() => {
    storageService = new FakeStorageService()

    sut = new CreateMessageMediaFromWAMessageUseCase(storageService)
  })

  it('should be able to create message media from wa message', async () => {
    const response = await sut.execute({
      waMessage: makeWAPrivateMessage({
        type: 'audio',
        media: makeWAMessageMedia(),
      }),
    })

    expect(response.isSuccess()).toBe(true)
  })
})
