import { Module } from '@nestjs/common'

import { AttendantsRepository } from '@/domain/chat/application/repositories/attendants-repository.js'
import { ChatsRepository } from '@/domain/chat/application/repositories/chats-repository.js'
import { ContactsRepository } from '@/domain/chat/application/repositories/contacts-repository.js'
import { GroupsRepository } from '@/domain/chat/application/repositories/groups-repository.js'
import { InstancesRepository } from '@/domain/chat/application/repositories/instances-repository.js'
import { MessagesRepository } from '@/domain/chat/application/repositories/messages-repository.js'
import { PrismaAttendantsRepository } from './repositories/prisma-attendants-repository.js'
import { PrismaChatsRepository } from './repositories/prisma-chats-repository.js'
import { PrismaContactsRepository } from './repositories/prisma-contacts-repository.js'
import { PrismaGroupsRepository } from './repositories/prisma-groups-repository.js'
import { PrismaInstancesRepository } from './repositories/prisma-instances-repository.js'
import { PrismaMessagesRepository } from './repositories/prisma-messages-repository.js'

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
    {
      provide: AttendantsRepository,
      useClass: PrismaAttendantsRepository,
    },
  ],
  exports: [
    ContactsRepository,
    GroupsRepository,
    MessagesRepository,
    ChatsRepository,
    InstancesRepository,
    AttendantsRepository,
  ],
})
export class PrismaChatRepositories {}
