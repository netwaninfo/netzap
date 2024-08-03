import { ValueObject } from '@/core/entities/value-object'
import type { SetNonNullable, SetOptional } from 'type-fest'
import { WAEntityID } from './wa-entity-id'

export interface WAMessageIDProps {
	entityId: WAEntityID
	isFromMe: boolean
	ref: string
	owner: string | null
}

type WAMessageIDWithOwner = SetNonNullable<WAMessageIDProps, 'owner'>

export class WAMessageID extends ValueObject<WAMessageIDProps> {
	get entityId() {
		return this.props.entityId
	}

	get isFromMe() {
		return this.props.isFromMe
	}

	get ref() {
		return this.props.ref
	}

	get owner() {
		return this.props.owner
	}

	hasOwner(): this is WAMessageIDWithOwner {
		return !!this.owner
	}

	/**
	 * @example 'true_5511785613460@c.us_063FF68C525CA652F443AB4BD8D6495D_out'
	 * @example 'false_5511785613460@c.us_063FF68C525CA652F443AB4BD8D6495D'
	 * @example 'true_5511687614061-1542791044@g.us_96121261CFD4D29D504966BE1EF5ED8E_5511987614061@c.us'
	 */
	override toString() {
		const values = [this.isFromMe, this.entityId.toString(), this.ref]
		if (this.hasOwner()) {
			values.push(this.owner)
		}

		return values.join('_')
	}

	override equals(id: WAMessageID) {
		return id.toString() === this.toString()
	}

	static create(props: SetOptional<WAMessageIDProps, 'owner'>) {
		return new WAMessageID({
			...props,
			owner: props.owner ?? null,
		})
	}

	static createFromString(value: string) {
		const values = value.split('_')
		const [isFromMe, rawEntityId, ref, owner] = values

		if (!isFromMe || !rawEntityId || !ref) {
			throw new Error(`Invalid value format for "${value}"`)
		}

		return new WAMessageID({
			ref,
			entityId: WAEntityID.createFromString(rawEntityId),
			isFromMe: isFromMe === 'true',
			owner: owner ?? null,
		})
	}
}
