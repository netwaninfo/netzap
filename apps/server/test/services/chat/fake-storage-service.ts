import { type Either, success } from '@/core/either.js'
import type {
  StorageService,
  StorageServicePutParams,
} from '@/domain/chat/application/services/storage-service.js'
import type { StorageObject } from '@/domain/chat/enterprise/entities/value-objects/storage-object.js'
import { ServiceUnavailableError } from '@/domain/shared/errors/service-unavailable-error.js'
import { UnhandledError } from '@/domain/shared/errors/unhandled-error.js'
import { makeStorageObject } from '@/test/factories/chat/value-objects/make-storage-object.js'
import { faker } from '@/test/lib/faker.js'

export class FakeStorageService implements StorageService {
  items: StorageObject[] = []

  async put({
    filename,
    mimeType,
  }: StorageServicePutParams): Promise<
    Either<UnhandledError | ServiceUnavailableError, StorageObject>
  > {
    const object = makeStorageObject({
      path: filename,
      url: faker.internet.url(),
      mimeType,
    })

    this.items.push(object)

    return success(object)
  }

  async delete(
    path: string
  ): Promise<Either<UnhandledError | ServiceUnavailableError, true>> {
    this.items = this.items.filter(item => item.path !== path)

    return success(true)
  }
}
