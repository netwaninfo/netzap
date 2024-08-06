import { MimeType } from '@/domain/chat/enterprise/entities/value-objects/mime-type'
import { faker } from '@/test/lib/faker'

export function makeMimeType(override?: string) {
	return MimeType.create(override ?? faker.system.mimeType())
}
