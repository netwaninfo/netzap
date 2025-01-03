import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { GroupRevokedMessage } from '@/domain/chat/enterprise/entities/group/revoked-message.js'
import { PrivateRevokedMessage } from '@/domain/chat/enterprise/entities/private/revoked-message.js'
import type { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id.js'
import { FakeMessageEmitter } from '@/test/emitters/chat/fake-message-emitter.js'
import { makeGroupTextMessage } from '@/test/factories/chat/group/make-group-text-message.js'
import { makePrivateAudioMessage } from '@/test/factories/chat/private/make-private-audio-message.js'
import { makePrivateTextMessage } from '@/test/factories/chat/private/make-private-text-message.js'
import { makeStorageObject } from '@/test/factories/chat/value-objects/make-storage-object.js'
import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id.js'
import { makeWAGroupChat } from '@/test/factories/chat/wa/make-wa-group-chat.js'
import { makeWAGroupMessage } from '@/test/factories/chat/wa/make-wa-group-message.js'
import { makeWAPrivateChat } from '@/test/factories/chat/wa/make-wa-private-chat.js'
import { makeWAPrivateMessage } from '@/test/factories/chat/wa/make-wa-private-message.js'
import { makeWAMessageMedia } from '@/test/factories/chat/wa/value-objects/make-wa-message-media.js'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { dayjs } from '@/test/lib/dayjs.js'
import { InMemoryMessagesRepository } from '@/test/repositories/chat/in-memory-messages-repository.js'
import { FakeDateService } from '@/test/services/chat/fake-date-service.js'
import { FakeStorageService } from '@/test/services/chat/fake-storage-service.js'
import { HandleRevokeWAMessage } from '../handle-revoke-wa-message.js'

describe('HandleRevokeWAMessage', () => {
  let messagesRepository: InMemoryMessagesRepository
  let dateService: FakeDateService
  let storageService: FakeStorageService
  let messageEmitter: FakeMessageEmitter

  let sut: HandleRevokeWAMessage

  let instanceId: UniqueEntityID
  let waChatId: WAEntityID

  beforeEach(() => {
    vi.useFakeTimers()

    messagesRepository = new InMemoryMessagesRepository()
    dateService = new FakeDateService()
    storageService = new FakeStorageService()
    messageEmitter = new FakeMessageEmitter()

    sut = new HandleRevokeWAMessage(
      messagesRepository,
      dateService,
      storageService,
      messageEmitter
    )

    instanceId = makeUniqueEntityID()
    waChatId = makeWAEntityID()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to revoke a private message from wa message revoked', async () => {
    const messageRef = makePrivateTextMessage({
      instanceId,
      waChatId,
    })
    messagesRepository.items.push(messageRef)

    const waChat = makeWAPrivateChat({ instanceId }, waChatId)
    const waRevokedMessage = makeWAPrivateMessage({
      instanceId,
      waChatId: waChat.id,
      type: 'text',
      timestamp: dayjs(messageRef.createdAt).unix(),
    })

    const response = await sut.execute({
      waRevokedMessage,
      waChat,
    })

    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message } = response.value

    expect(messagesRepository.items[0]).toBeInstanceOf(PrivateRevokedMessage)
    expect(message).toBeInstanceOf(PrivateRevokedMessage)
  })

  it('should be able to revoke a group message from wa message revoked', async () => {
    const messageRef = makeGroupTextMessage({
      instanceId,
      waChatId,
    })
    messagesRepository.items.push(messageRef)

    const waChat = makeWAGroupChat({ instanceId }, waChatId)
    const waRevokedMessage = makeWAGroupMessage({
      instanceId,
      waChatId: waChat.id,
      type: 'text',
      timestamp: dayjs(messageRef.createdAt).unix(),
    })

    const response = await sut.execute({
      waRevokedMessage,
      waChat,
    })

    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { message } = response.value

    expect(messagesRepository.items[0]).toBeInstanceOf(GroupRevokedMessage)
    expect(message).toBeInstanceOf(GroupRevokedMessage)
  })

  it('should be able to revoke a message with media from wa message revoked', async () => {
    const messageRef = makePrivateAudioMessage({
      instanceId,
      waChatId,
    })
    messagesRepository.items.push(messageRef)
    assert(!!messageRef.media)

    const storageObject = makeStorageObject({ path: messageRef.media.key })
    storageService.items.push(storageObject)

    const waChat = makeWAPrivateChat({ instanceId }, waChatId)
    const waRevokedMessage = makeWAPrivateMessage({
      instanceId,
      waChatId: waChat.id,
      type: 'audio',
      timestamp: dayjs(messageRef.createdAt).unix(),
      media: makeWAMessageMedia(),
    })

    const storageServiceMock = vi.spyOn(storageService, 'delete')

    const response = await sut.execute({
      waRevokedMessage,
      waChat,
    })

    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    expect(storageService.items).toHaveLength(0)
    expect(storageServiceMock).toHaveBeenCalled()
  })
})
