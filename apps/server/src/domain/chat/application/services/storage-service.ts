import type { Readable } from 'node:stream'
import type { MimeType } from '../../enterprise/entities/value-objects/mime-type'
import type { StorageObject } from '../../enterprise/entities/value-objects/storage-object'

export interface StorageServicePutParams {
	filename: string
	mimeType: MimeType
	data: Readable
}

export abstract class StorageService {
	abstract put(params: StorageServicePutParams): Promise<StorageObject>
}
