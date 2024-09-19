import timers from 'node:timers/promises'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { EnvService } from '@/infra/env/env.service'
import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common'
import { WWJSClient } from './wwjs-client'
import { WWJSFactory } from './wwjs-factory.service'

@Injectable()
export class WWJSService implements OnModuleInit, OnApplicationShutdown {
  constructor(
    private factory: WWJSFactory,
    private prisma: PrismaService,
    private env: EnvService
  ) {}

  private clients: Map<string, WWJSClient> = new Map()

  async onModuleInit() {
    const instances = await this.prisma.instance.findMany({
      select: { id: true, status: true, state: true },
    })

    const clients = instances.map(instance =>
      this.factory.createClient({
        instanceId: UniqueEntityID.create(instance.id),
        state: instance.state,
        status: instance.status,
      })
    )

    this.clients = new Map(
      clients.map(client => [client.instanceId.toString(), client] as const)
    )

    Promise.all(clients.map(client => client.init()))
  }

  async onApplicationShutdown() {
    const clients = Array.from(this.clients.values())
    await Promise.all(clients.map(client => client.close()))

    const timeout = this.env.get('WWJS_INSTANCE_DELAY_IN_MS') * clients.length
    await timers.setTimeout(timeout)
  }

  getAvailableClient(instanceId: UniqueEntityID) {
    const client = this.clients.get(instanceId.toString())

    if (!client || !client.isAvailable()) return null

    return client
  }
}
