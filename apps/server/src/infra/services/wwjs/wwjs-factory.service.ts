import { Injectable, type OnModuleInit } from '@nestjs/common'
import type { Except } from 'type-fest'

import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { EnvService } from '@/infra/env/env.service.js'
import { DiscoveryService } from '../utilities/nestjs/discovery.service.js'
import { WWJSLocalAuthStrategy } from './auth-strategies/local-auth-strategy.js'
import { BROWSER_ARGS, WWJS_EVENT_KEY, WWJS_HANDLER_KEY } from './constants.js'
import { WWJSInternalClient } from './internal/client.js'
import type { WWJSEvent } from './types/wwjs-event.js'
import { WWJSHandler } from './types/wwjs-handler.js'
import { WWJSClient, type WWJSClientProps } from './wwjs-client.js'

type WWJSFactoryCreateClientProps = Except<WWJSClientProps, 'raw'>

@Injectable()
export class WWJSFactory implements OnModuleInit {
  constructor(
    private env: EnvService,
    private discoveryService: DiscoveryService
  ) {}

  private handlers: [WWJSEvent, WWJSHandler][] = []

  async onModuleInit() {
    const providers =
      await this.discoveryService.getInstancesProviders<WWJSHandler>({
        metadataKey: WWJS_HANDLER_KEY,
      })

    this.handlers = providers.map(instance => {
      return [Reflect.getMetadata(WWJS_EVENT_KEY, instance.register), instance]
    })
  }

  private createWWJSInternalClient(clientId: UniqueEntityID) {
    const isProduction = this.env.get('NODE_ENV') === 'production'

    return new WWJSInternalClient({
      authStrategy: new WWJSLocalAuthStrategy({
        clientId: clientId.toString(),
      }),
      puppeteer: {
        args: BROWSER_ARGS,
        executablePath: this.env.get('WWJS_EXECUTABLE_PATH'),
        headless: isProduction,
        handleSIGHUP: false,
        handleSIGINT: false,
        handleSIGTERM: false,
      },
    })
  }

  createClient({ instanceId, state, status }: WWJSFactoryCreateClientProps) {
    const client = WWJSClient.create({
      raw: this.createWWJSInternalClient(instanceId),
      instanceId,
      state,
      status,
    })

    for (const [event, handler] of this.handlers) {
      client.addHandler(event, handler)
    }

    return client
  }
}
