import { Instance } from '@/domain/chat/enterprise/entities/instance'

import { ChatHttpInstance } from '@netzap/contracts/http'

export class InstancePresenter {
	static toHttp(instance: Instance): ChatHttpInstance {
		return {
			id: instance.id.toString(),
			name: instance.name,
			phone: instance.phone,
			status: instance.status,
		}
	}
}
