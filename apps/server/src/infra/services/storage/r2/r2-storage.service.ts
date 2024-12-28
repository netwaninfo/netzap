import crypto from 'node:crypto'
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
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
export class R2StorageService extends RunSafely implements StorageService {
  private client: S3Client

  constructor(private env: EnvService) {
    super()

    const ACCOUNT_ID = this.env.get('CLOUDFLARE_ACCOUNT_ID')

    this.client = new S3Client({
      region: 'auto',
      endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: this.env.get('CLOUDFLARE_ACCESS_KEY_ID'),
        secretAccessKey: this.env.get('CLOUDFLARE_SECRET_ACCESS_KEY'),
      },
    })
  }

  private formatFilePath(fileKey: string) {
    return `medias/${fileKey}`
  }

  private getPublicFileUrl(filePath: string) {
    return new URL(
      filePath.replace(/^\//, '').trim(),
      this.env.get('CLOUDFLARE_PUBLIC_BUCKET_URL')
    ).toString()
  }

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
    const filePath = this.formatFilePath(fileKey)

    const upload = new Upload({
      client: this.client,
      params: {
        Bucket: this.env.get('CLOUDFLARE_BUCKET_NAME'),
        Key: filePath,
        Body: data,
        ContentType: mimeType.toString(),
      },
    })

    const response = await this.runSafely(() => upload.done())
    if (response.isFailure()) return failure(response.value)

    const storageObject = StorageObject.create({
      mimeType,
      path: filePath,
      url: this.getPublicFileUrl(filePath),
    })

    return success(storageObject)
  }

  async delete(
    path: string
  ): Promise<Either<UnhandledError | ServiceUnavailableError, true>> {
    const command = new DeleteObjectCommand({
      Bucket: this.env.get('CLOUDFLARE_BUCKET_NAME'),
      Key: path,
    })

    const response = await this.runSafely(() => this.client.send(command))
    if (response.isFailure()) return failure(response.value)

    return success(true)
  }
}
