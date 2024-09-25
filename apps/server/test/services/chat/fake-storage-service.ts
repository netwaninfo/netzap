import { Either, success } from '@/core/either'
import type {
  StorageService,
  StorageServicePutParams,
} from '@/domain/chat/application/services/storage-service'
import type { StorageObject } from '@/domain/chat/enterprise/entities/value-objects/storage-object'
import { ServiceUnavailableError } from '@/domain/shared/errors/service-unavailable-error'
import { UnhandledError } from '@/domain/shared/errors/unhandled-error'
import { makeStorageObject } from '@/test/factories/chat/value-objects/make-storage-object'
import { faker } from '@/test/lib/faker'

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
