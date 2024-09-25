import type { Readable } from 'node:stream'
import { Either } from '@/core/either'
import { ServiceUnavailableError } from '@/domain/shared/errors/service-unavailable-error'
import { UnhandledError } from '@/domain/shared/errors/unhandled-error'
import type { MimeType } from '../../enterprise/entities/value-objects/mime-type'
import type { StorageObject } from '../../enterprise/entities/value-objects/storage-object'

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
