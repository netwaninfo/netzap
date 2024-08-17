import type {
	StorageService,
	StorageServicePutParams,
} from '@/domain/chat/application/services/storage-service'
import type { StorageObject } from '@/domain/chat/enterprise/entities/value-objects/storage-object'
import { makeStorageObject } from '@/test/factories/chat/value-objects/make-storage-object'
import { faker } from '@/test/lib/faker'

export class FakeStorageService implements StorageService {
	items: StorageObject[] = []

	async put({
		filename,
		mimeType,
	}: StorageServicePutParams): Promise<StorageObject> {
		const object = makeStorageObject({
			path: filename,
			url: faker.internet.url(),
			mimeType,
		})
		this.items.push(object)

		return object
	}

	async delete(path: string): Promise<void> {
		this.items = this.items.filter((item) => item.path !== path)
	}
}
