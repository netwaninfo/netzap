import {
  StorageObject,
  type StorageObjectProps,
} from '@/domain/chat/enterprise/entities/value-objects/storage-object.js'
import { faker } from '@/test/lib/faker.js'
import { makeMimeType } from './make-mime-type.js'

export function makeStorageObject(override: Partial<StorageObjectProps> = {}) {
  return StorageObject.create({
    mimeType: makeMimeType(),
    path: faker.system.directoryPath(),
    url: faker.image.url(),
    ...override,
  })
}
