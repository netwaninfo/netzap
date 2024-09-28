import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { EnvService } from '@/infra/env/env.service'
import { Injectable, OnModuleInit } from '@nestjs/common'
import { DiscoveryService } from '@nestjs/core'
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper'
import { Except } from 'type-fest'
import { BROWSER_ARGS, WWJS_EVENT_KEY, WWJS_HANDLER_KEY } from './constants'
import { WWJSInternalClient } from './internal/client'
import { WWJSLocalStrategy } from './strategies/local-strategy'
import { WWJSEvent } from './types/wwjs-event'
import { WWJSHandler } from './types/wwjs-handler'
import { WWJSClient, WWJSClientProps } from './wwjs-client'

type WWJSFactoryCreateClientProps = Except<WWJSClientProps, 'raw'>

@Injectable()
export class WWJSFactory implements OnModuleInit {
  constructor(
    private env: EnvService,
    private discoveryService: DiscoveryService
  ) {}

  private handlers: [WWJSEvent, WWJSHandler][] = []

  onModuleInit() {
    const providers = this.discoveryService
      .getProviders()
      .filter((wrapper): wrapper is InstanceWrapper<WWJSHandler> => {
        return (
          wrapper.metatype &&
          Reflect.getMetadata(WWJS_HANDLER_KEY, wrapper.metatype)
        )
      })

    this.handlers = providers.map(({ instance }) => {
      return [Reflect.getMetadata(WWJS_EVENT_KEY, instance.register), instance]
    })
  }

  private createWWJSInternalClient(clientId: UniqueEntityID) {
    const isProduction = this.env.get('NODE_ENV') === 'production'

    return new WWJSInternalClient({
      authStrategy: new WWJSLocalStrategy({ clientId: clientId.toString() }),
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
      client.raw.on(event, handler.register(client))
    }

    return client
  }
}
