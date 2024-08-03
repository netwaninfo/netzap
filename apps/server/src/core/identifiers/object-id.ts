import Id from 'bson-objectid'
import { Identifier } from '../entities/identifier'

export class ObjectId extends Identifier {
	static create(value?: string) {
		return new ObjectId(value ?? new Id().toHexString())
	}
}
