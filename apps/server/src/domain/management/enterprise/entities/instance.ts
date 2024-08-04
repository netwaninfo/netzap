import type { InstanceStatus } from '@netzap/contracts/enums'
import type { SetOptional } from 'type-fest'

import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface InstanceProps {
	name: string
	phone: string
	qrCode: string | null
	status: InstanceStatus
}

export class Instance extends Entity<InstanceProps> {
	get name() {
		return this.props.name
	}

	get phone() {
		return this.props.phone
	}

	get qrCode() {
		return this.props.qrCode
	}

	get status() {
		return this.props.status
	}

	initialized() {
		this.set({ status: 'initialized' })
	}

	authenticated() {
		this.set({ status: 'authenticated' })
	}

	failed() {
		this.set({ status: 'failed' })
	}

	connected() {
		this.set({ status: 'connected' })
	}

	disconnected() {
		this.set({ status: 'disconnected' })
	}

	static create(
		props: SetOptional<InstanceProps, 'qrCode' | 'status'>,
		id?: UniqueEntityID,
	) {
		return new Instance(
			{
				...props,
				qrCode: props.qrCode ?? null,
				status: props.status ?? 'disconnected',
			},
			id,
		)
	}
}
