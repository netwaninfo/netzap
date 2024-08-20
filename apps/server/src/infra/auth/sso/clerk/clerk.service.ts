import { EnvService } from '@/infra/env/env.service'
import { ClerkClient, createClerkClient } from '@clerk/clerk-sdk-node'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ClerkService {
	client: ClerkClient

	constructor(env: EnvService) {
		this.client = createClerkClient({
			publishableKey: env.get('CLERK_PUBLISHABLE_KEY'),
			secretKey: env.get('CLERK_SECRET_KEY'),
		})
	}
}
