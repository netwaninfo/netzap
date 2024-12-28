import { Module, forwardRef } from '@nestjs/common'

import { UtilitiesModule } from '@/infra/services/utilities/utilities.module.js'
import { WWJSModule } from '@/infra/services/wwjs/wwjs.module.js'

import { HandleChatRead } from '@/domain/chat/application/handlers/handle-chat-read.js'
import { HandleChatUnread } from '@/domain/chat/application/handlers/handle-chat-unread.js'
import { HandleSendTextMessage } from '@/domain/chat/application/handlers/handle-send-text-message.js'
import { CreateChatFromWAChatUseCase } from '@/domain/chat/application/use-cases/chats/create-chat-from-wa-chat-use-case.js'
import { CreateGroupChatFromWAChatUseCase } from '@/domain/chat/application/use-cases/chats/create-group-chat-from-wa-chat-use-case.js'
import { CreatePrivateChatFromWAChatUseCase } from '@/domain/chat/application/use-cases/chats/create-private-chat-from-wa-chat-use-case.js'
import { CreateContactFromWAContactUseCase } from '@/domain/chat/application/use-cases/contacts/create-contact-from-wa-contact-use-case.js'
import { CreateContactsFromWAContactsUseCase } from '@/domain/chat/application/use-cases/contacts/create-contacts-from-wa-contacts-use-case.js'
import { CreateGroupFromWAContactUseCase } from '@/domain/chat/application/use-cases/groups/create-group-from-wa-contact-use-case.js'
import { CreateTextMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/create-text-message-from-wa-message-use-case.js'
import { CreateGroupTextMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/group/create-group-text-message-from-wa-message-use-case.js'
import { CreatePrivateTextMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/private/create-private-text-message-from-wa-message-use-case.js'

import { SocketChatModule } from '../socket-chat.module.js'
import { SocketHandleChatRead } from './socket-handle-chat-read.js'
import { SocketHandleChatUnread } from './socket-handle-chat-unread.js'
import { SocketHandleSendTextMessage } from './socket-handle-send-text-message.js'

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
