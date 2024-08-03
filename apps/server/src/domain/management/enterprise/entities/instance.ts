import type { InstanceState } from '@netzap/contracts/enums'
import type { SetOptional } from 'type-fest'

import { Entity } from '@/core/entities/entity'
import { ObjectId } from '@/core/identifiers/object-id'

export interface InstanceProps {
	name: string
	qrCode: string | null
	state: InstanceState
}

export class Instance extends Entity<InstanceProps> {
	get name() {
		return this.props.name
	}

	get qrCode() {
		return this.props.qrCode
	}

	get state() {
		return this.props.state
	}

	initialized() {
		this.set({ state: 'initialized' })
	}

	authenticated() {
		this.set({ state: 'authenticated' })
	}

	failed() {
		this.set({ state: 'failed' })
	}

	connected() {
		this.set({ state: 'connected' })
	}

	disconnected() {
		this.set({ state: 'disconnected' })
	}

	static create(
		props: SetOptional<InstanceProps, 'qrCode' | 'state'>,
		id?: string,
	) {
		return new Instance(
			{
				...props,
				qrCode: props.qrCode ?? null,
				state: props.state ?? 'disconnected',
			},
			ObjectId.create(id),
		)
	}
}
