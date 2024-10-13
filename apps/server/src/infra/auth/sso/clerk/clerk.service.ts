import { createClerkClient, verifyToken } from '@clerk/backend'
import { Injectable } from '@nestjs/common'

import { EnvService } from '@/infra/env/env.service'

@Injectable()
export class ClerkService {
  client: ReturnType<typeof createClerkClient>

  constructor(private env: EnvService) {
    this.client = createClerkClient({
      publishableKey: this.env.get('CLERK_PUBLISHABLE_KEY'),
      secretKey: this.env.get('CLERK_SECRET_KEY'),
    })
  }

  async verifyToken(token: string): Promise<ReturnType<typeof verifyToken>> {
    return verifyToken(token, {
      secretKey: this.env.get('CLERK_SECRET_KEY'),
    })
  }
}
