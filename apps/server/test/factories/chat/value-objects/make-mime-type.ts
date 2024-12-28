import { MimeType } from '@/domain/chat/enterprise/entities/value-objects/mime-type.js'
import { faker } from '@/test/lib/faker.js'

export function makeMimeType(override?: string) {
  return MimeType.create(override ?? faker.system.mimeType())
}
