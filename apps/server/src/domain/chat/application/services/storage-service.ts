import type { Readable } from 'node:stream'
import type { Either } from '@/core/either.js'
import { ServiceUnavailableError } from '@/domain/shared/errors/service-unavailable-error.js'
import { UnhandledError } from '@/domain/shared/errors/unhandled-error.js'
import type { MimeType } from '../../enterprise/entities/value-objects/mime-type.js'
import type { StorageObject } from '../../enterprise/entities/value-objects/storage-object.js'

export interface StorageServicePutParams {
  filename: string
  mimeType: MimeType
  data: Readable
}

export abstract class StorageService {
  abstract put(
    params: StorageServicePutParams
  ): Promise<Either<UnhandledError | ServiceUnavailableError, StorageObject>>

  abstract delete(
    path: string
  ): Promise<Either<UnhandledError | ServiceUnavailableError, true>>
}
