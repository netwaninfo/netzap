import { ChatsRepository } from '@/domain/chat/application/repositories/chats-repository'
import { ContactsRepository } from '@/domain/chat/application/repositories/contacts-repository'
import { GroupsRepository } from '@/domain/chat/application/repositories/groups-repository'
import { InstancesRepository } from '@/domain/chat/application/repositories/instances-repository'
import { MessagesRepository } from '@/domain/chat/application/repositories/messages-repository'
import { Module } from '@nestjs/common'
import { PrismaChatsRepository } from './repositories/prisma-chats-repository'
import { PrismaContactsRepository } from './repositories/prisma-contacts-repository'
import { PrismaGroupsRepository } from './repositories/prisma-groups-repository'
import { PrismaInstancesRepository } from './repositories/prisma-instances-repository'
import { PrismaMessagesRepository } from './repositories/prisma-messages-repository'

@Module({
  providers: [
    {
      provide: ContactsRepository,
      useClass: PrismaContactsRepository,
    },
    {
      provide: GroupsRepository,
      useClass: PrismaGroupsRepository,
    },
    {
      provide: MessagesRepository,
      useClass: PrismaMessagesRepository,
    },
    {
      provide: ChatsRepository,
      useClass: PrismaChatsRepository,
    },
    {
      provide: InstancesRepository,
      useClass: PrismaInstancesRepository,
    },
  ],
  exports: [
    ContactsRepository,
    GroupsRepository,
    MessagesRepository,
    ChatsRepository,
    InstancesRepository,
  ],
})
export class PrismaChatRepositories {}
