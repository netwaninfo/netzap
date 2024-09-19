import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { EnvService } from '@/infra/env/env.service'
import { Injectable } from '@nestjs/common'
import { Except } from 'type-fest'
import { BROWSER_ARGS } from './constants'
import { WWJSInternalClient } from './internal/client'
import { WWJSLocalStrategy } from './strategies/local-strategy'
import { WWJSHandler } from './types/wwjs-handler'
import { WWJSClient, WWJSClientProps } from './wwjs-client'

type WWJSFactoryCreateClientProps = Except<WWJSClientProps, 'raw'>

@Injectable()
export class WWJSFactory {
  constructor(private env: EnvService) {}

  private handlers: WWJSHandler[] = []

  addHandler(handler: WWJSHandler) {
    this.handlers.push(handler)
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

    client.addHandlers(this.handlers)

    return client
  }
}
