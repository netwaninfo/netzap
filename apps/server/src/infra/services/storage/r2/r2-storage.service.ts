import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { Injectable } from '@nestjs/common'

import { randomUUID } from 'node:crypto'
import { Either, failure, success } from '@/core/either'
import {
  StorageService,
  StorageServicePutParams,
} from '@/domain/chat/application/services/storage-service'
import { StorageObject } from '@/domain/chat/enterprise/entities/value-objects/storage-object'
import { ServiceUnavailableError } from '@/domain/shared/errors/service-unavailable-error'
import { UnhandledError } from '@/domain/shared/errors/unhandled-error'
import { EnvService } from '@/infra/env/env.service'
import { RequestFunction } from '../../wwjs/types/internals'

@Injectable()
export class R2StorageService implements StorageService {
  private client: S3Client

  constructor(private env: EnvService) {
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

  private async wrap<T>(
    request: RequestFunction<T>
  ): Promise<Either<UnhandledError, T>> {
    try {
      return success(await request())
    } catch (error) {
      const err = error as Error
      return failure(new UnhandledError({ message: err.message }))
    }
  }

  private getObjectPath(key: string) {
    return `${this.env.get('CLOUDFLARE_BUCKET_MEDIA_PATH')}/${key}`
  }

  private getPublicObjectUrl(key: string) {
    const url = new URL(
      key,
      new URL(
        this.env.get('CLOUDFLARE_BUCKET_MEDIA_PATH'),
        this.env.get('CLOUDFLARE_PUBLIC_BUCKET_URL')
      )
    )

    return url.toString()
  }

  async put({
    data,
    filename,
    mimeType,
  }: StorageServicePutParams): Promise<
    Either<UnhandledError | ServiceUnavailableError, StorageObject>
  > {
    const uuid = randomUUID()
    const objectKey = `${uuid}-${filename}`
    const objectPath = this.getObjectPath(objectKey)

    const command = new PutObjectCommand({
      Bucket: this.env.get('CLOUDFLARE_BUCKET_NAME'),
      Key: objectPath,
      Body: data,
      ContentType: mimeType.toString(),
    })

    const response = await this.wrap(() => this.client.send(command))
    if (response.isFailure()) return failure(response.value)

    const storageObject = StorageObject.create({
      mimeType,
      path: objectPath,
      url: this.getPublicObjectUrl(objectKey),
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

    const response = await this.wrap(() => this.client.send(command))
    if (response.isFailure()) return failure(response.value)

    return success(true)
  }
}
