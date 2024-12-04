import { CreateChatFromWAChatUseCase } from '@/domain/chat/application/use-cases/chats/create-chat-from-wa-chat-use-case'
import { CreateGroupChatFromWAChatUseCase } from '@/domain/chat/application/use-cases/chats/create-group-chat-from-wa-chat-use-case'
import { CreatePrivateChatFromWAChatUseCase } from '@/domain/chat/application/use-cases/chats/create-private-chat-from-wa-chat-use-case'
import { FetchChatsUseCase } from '@/domain/chat/application/use-cases/chats/fetch-chats-use-case'
import { GetChatUseCase } from '@/domain/chat/application/use-cases/chats/get-chat-use-case'
import { CreateContactFromWAContactUseCase } from '@/domain/chat/application/use-cases/contacts/create-contact-from-wa-contact-use-case'
import { CreateContactsFromWAContactsUseCase } from '@/domain/chat/application/use-cases/contacts/create-contacts-from-wa-contacts-use-case'
import { CreateGroupFromWAContactUseCase } from '@/domain/chat/application/use-cases/groups/create-group-from-wa-contact-use-case'
import { ServicesModule } from '@/infra/services/services.module'
import { Module } from '@nestjs/common'
import { FetchChatsController } from './fetch-chats.controller'
import { GetChatController } from './get-chat.controller'

@Module({
  imports: [ServicesModule],
  controllers: [FetchChatsController, GetChatController],
  providers: [
    FetchChatsUseCase,

    GetChatUseCase,
    CreateChatFromWAChatUseCase,
    CreatePrivateChatFromWAChatUseCase,
    CreateContactFromWAContactUseCase,
    CreateGroupChatFromWAChatUseCase,
    CreateGroupFromWAContactUseCase,
    CreateContactsFromWAContactsUseCase,
  ],
})
export class HttpChatsModule {}
