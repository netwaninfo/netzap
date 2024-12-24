import { Module, forwardRef } from '@nestjs/common'

import { UtilitiesModule } from '@/infra/services/utilities/utilities.module'
import { WWJSModule } from '@/infra/services/wwjs/wwjs.module'

import { HandleChatRead } from '@/domain/chat/application/handlers/handle-chat-read'
import { HandleChatUnread } from '@/domain/chat/application/handlers/handle-chat-unread'
import { HandleSendTextMessage } from '@/domain/chat/application/handlers/handle-send-text-message'
import { CreateChatFromWAChatUseCase } from '@/domain/chat/application/use-cases/chats/create-chat-from-wa-chat-use-case'
import { CreateGroupChatFromWAChatUseCase } from '@/domain/chat/application/use-cases/chats/create-group-chat-from-wa-chat-use-case'
import { CreatePrivateChatFromWAChatUseCase } from '@/domain/chat/application/use-cases/chats/create-private-chat-from-wa-chat-use-case'
import { CreateContactFromWAContactUseCase } from '@/domain/chat/application/use-cases/contacts/create-contact-from-wa-contact-use-case'
import { CreateContactsFromWAContactsUseCase } from '@/domain/chat/application/use-cases/contacts/create-contacts-from-wa-contacts-use-case'
import { CreateGroupFromWAContactUseCase } from '@/domain/chat/application/use-cases/groups/create-group-from-wa-contact-use-case'
import { CreateTextMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/create-text-message-from-wa-message-use-case'
import { CreateGroupTextMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/group/create-group-text-message-from-wa-message-use-case'
import { CreatePrivateTextMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/private/create-private-text-message-from-wa-message-use-case'

import { SocketChatModule } from '../socket-chat.module'
import { SocketHandleChatRead } from './socket-handle-chat-read'
import { SocketHandleChatUnread } from './socket-handle-chat-unread'
import { SocketHandleSendTextMessage } from './socket-handle-send-text-message'

@Module({
  imports: [forwardRef(() => SocketChatModule), WWJSModule, UtilitiesModule],
  providers: [
    SocketHandleChatRead,
    HandleChatRead,

    SocketHandleChatUnread,
    HandleChatUnread,

    SocketHandleSendTextMessage,
    HandleSendTextMessage,
    CreateChatFromWAChatUseCase,
    CreateGroupChatFromWAChatUseCase,
    CreateGroupFromWAContactUseCase,
    CreateContactsFromWAContactsUseCase,
    CreatePrivateChatFromWAChatUseCase,
    CreateContactFromWAContactUseCase,
    CreateTextMessageFromWAMessageUseCase,
    CreatePrivateTextMessageFromWAMessageUseCase,
    CreateGroupTextMessageFromWAMessageUseCase,
  ],
})
export class SocketHandlersModule {}
