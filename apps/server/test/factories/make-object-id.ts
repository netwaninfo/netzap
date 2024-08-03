import { ObjectId } from '@/core/identifiers/object-id'

export function makeObjectId(id?: string) {
	return ObjectId.create(id)
}
