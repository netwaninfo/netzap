import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { Injectable } from '@nestjs/common'

import { type Either, failure, success } from '@/core/either.js'
import type {
  StorageService,
  StorageServicePutParams,
} from '@/domain/chat/application/services/storage-service.js'
import { StorageObject } from '@/domain/chat/enterprise/entities/value-objects/storage-object.js'
import { ServiceUnavailableError } from '@/domain/shared/errors/service-unavailable-error.js'
import { UnhandledError } from '@/domain/shared/errors/unhandled-error.js'
import { EnvService } from '@/infra/env/env.service.js'
import { RunSafely } from '../../shared/run-safely.js'

@Injectable()
export class FileSystemStorageService
  extends RunSafely
  implements StorageService
{
  constructor(private env: EnvService) {
    super()
  }

  private TMP_FOLDER = path.resolve(process.cwd(), 'tmp')

  async put({
    data,
    filename,
    mimeType,
  }: StorageServicePutParams): Promise<
    Either<UnhandledError | ServiceUnavailableError, StorageObject>
  > {
    const hash = crypto.createHash('md5').update(filename).digest('hex')
    const extension = mimeType.extension()

    const fileKey = `${hash}.${extension}`
    const filePath = path.resolve(this.TMP_FOLDER, fileKey)

    await this.runSafely(() => {
      return new Promise((resolve, reject) => {
        data
          .pipe(fs.createWriteStream(filePath))
          .on('error', reject)
          .on('finish', resolve)
      })
    })

    const fileUrl = new URL(
      `${this.env.get('MEDIA_PUBLIC_PATH')}/${fileKey}`,
      this.env.get('PUBLIC_URL')
    ).toString()

    const storageObject = StorageObject.create({
      mimeType,
      path: fileKey,
      url: fileUrl,
    })

    return success(storageObject)
  }

  async delete(
    key: string
  ): Promise<Either<UnhandledError | ServiceUnavailableError, true>> {
    const filePath = path.resolve(this.TMP_FOLDER, key)
    const hasFile = fs.existsSync(filePath)

    if (!hasFile) return success(true)

    const response = await this.runSafely(async () => {
      await fs.promises.unlink(filePath)
    })

    if (response.isFailure()) return failure(response.value)

    return success(true)
  }
}
