import {
	StorageObject,
	type StorageObjectProps,
} from '@/domain/chat/enterprise/entities/value-objects/storage-object'
import { faker } from '@/test/lib/faker'
import { makeMimeType } from './make-mime-type'

export function makeStorageObject(override: Partial<StorageObjectProps> = {}) {
	return StorageObject.create({
		mimeType: makeMimeType(),
		path: faker.system.directoryPath(),
		url: faker.image.url(),
		...override,
	})
}
