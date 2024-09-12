import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { WWJSClient } from './wwjs-client'
import { WWJSFactory } from './wwjs-factory.service'

@Injectable()
export class WWJSService implements OnModuleInit, OnModuleDestroy {
  constructor(
    private factory: WWJSFactory,
    private prisma: PrismaService
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

  async onModuleDestroy() {
    const clients = Array.from(this.clients.values())

    await Promise.all(clients.map(client => client.close()))
  }

  getAvailableClient(instanceId: UniqueEntityID) {
    const client = this.clients.get(instanceId.toString())

    if (!client || !client.isAvailable()) return null

    return client
  }
}
