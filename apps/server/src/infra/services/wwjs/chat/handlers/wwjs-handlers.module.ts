import { Module, forwardRef } from '@nestjs/common'

import { HandleChangeWAChatUnreadCount } from '@/domain/chat/application/handlers/handle-change-wa-chat-unread-count.js'
import { HandleChangeWAMessageACK } from '@/domain/chat/application/handlers/handle-change-wa-message-ack.js'
import { HandleReceivedWAMessage } from '@/domain/chat/application/handlers/handle-received-wa-message.js'
import { HandleRevokeWAMessage } from '@/domain/chat/application/handlers/handle-revoke-wa-message.js'
import { CreateChatFromWAChatUseCase } from '@/domain/chat/application/use-cases/chats/create-chat-from-wa-chat-use-case.js'
import { CreateGroupChatFromWAChatUseCase } from '@/domain/chat/application/use-cases/chats/create-group-chat-from-wa-chat-use-case.js'
import { CreatePrivateChatFromWAChatUseCase } from '@/domain/chat/application/use-cases/chats/create-private-chat-from-wa-chat-use-case.js'
import { CreateContactFromWAContactUseCase } from '@/domain/chat/application/use-cases/contacts/create-contact-from-wa-contact-use-case.js'
import { CreateContactsFromWAContactsUseCase } from '@/domain/chat/application/use-cases/contacts/create-contacts-from-wa-contacts-use-case.js'
import { CreateGroupFromWAContactUseCase } from '@/domain/chat/application/use-cases/groups/create-group-from-wa-contact-use-case.js'
import { CreateMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/create-message-from-wa-message-use-case.js'
import { CreateMessageMediaFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/create-message-media-from-wa-message-use-case.js'
import { CreateGroupAudioMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/group/create-group-audio-message-from-wa-message-use-case.js'
import { CreateGroupDocumentMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/group/create-group-document-message-from-wa-message-use-case.js'
import { CreateGroupImageMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/group/create-group-image-message-from-wa-message-use-case.js'
import { CreateGroupMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/group/create-group-message-from-wa-message-use-case.js'
import { CreateGroupMultiVCardMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/group/create-group-multi-card-message-from-wa-message-use-case.js'
import { CreateGroupRevokedMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/group/create-group-revoked-message-from-wa-message-use-case.js'
import { CreateGroupTextMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/group/create-group-text-message-from-wa-message-use-case.js'
import { CreateGroupUnknownMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/group/create-group-unknown-message-from-wa-message-use-case.js'
import { CreateGroupVCardMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/group/create-group-v-card-message-from-wa-message-use-case.js'
import { CreateGroupVideoMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/group/create-group-video-message-from-wa-message-use-case.js'
import { CreateGroupVoiceMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/group/create-group-voice-message-from-wa-message-use-case.js'
import { CreatePrivateAudioMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/private/create-private-audio-message-from-wa-message-use-case.js'
import { CreatePrivateDocumentMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/private/create-private-document-message-from-wa-message-use-case.js'
import { CreatePrivateImageMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/private/create-private-image-message-from-wa-message-use-case.js'
import { CreatePrivateMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/private/create-private-message-from-wa-message-use-case.js'
import { CreatePrivateMultiVCardMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/private/create-private-multi-card-message-from-wa-message-use-case.js'
import { CreatePrivateRevokedMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/private/create-private-revoked-message-from-wa-message-use-case.js'
import { CreatePrivateTextMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/private/create-private-text-message-from-wa-message-use-case.js'
import { CreatePrivateUnknownMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/private/create-private-unknown-message-from-wa-message-use-case.js'
import { CreatePrivateVCardMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/private/create-private-v-card-message-from-wa-message-use-case.js'
import { CreatePrivateVideoMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/private/create-private-video-message-from-wa-message-use-case.js'
import { CreatePrivateVoiceMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/private/create-private-voice-message-from-wa-message-use-case.js'
import { SocketModule } from '@/infra/services/socket-io/socket.module.js'
import { StorageModule } from '@/infra/services/storage/storage.module.js'
import { UtilitiesModule } from '@/infra/services/utilities/utilities.module.js'
import { WWJSMappersModule } from '../mappers/wwjs-mappers.module.js'
import { WWJSHandleChatUnreadCount } from './wwjs-handle-chat-unread-count.js'
import { WWJSHandleMessageAck } from './wwjs-handle-message-ack.js'
import { WWJSHandleMessageReceived } from './wwjs-handle-message-received.js'
import { WWJSHandleMessageRevokedEveryone } from './wwjs-handle-message-revoked-everyone.js'

@Module({
  imports: [
    forwardRef(() => SocketModule),
    UtilitiesModule,
    StorageModule,
    WWJSMappersModule,
  ],
  providers: [
    WWJSHandleMessageReceived,
    HandleReceivedWAMessage,
    CreateChatFromWAChatUseCase,
    CreateGroupChatFromWAChatUseCase,
    CreatePrivateChatFromWAChatUseCase,
    CreateGroupFromWAContactUseCase,
    CreateContactsFromWAContactsUseCase,
    CreateMessageFromWAMessageUseCase,
    CreatePrivateMessageFromWAMessageUseCase,
    CreateGroupMessageFromWAMessageUseCase,
    CreatePrivateAudioMessageFromWAMessageUseCase,
    CreatePrivateDocumentMessageFromWAMessageUseCase,
    CreatePrivateImageMessageFromWAMessageUseCase,
    CreatePrivateMultiVCardMessageFromWAMessageUseCase,
    CreatePrivateRevokedMessageFromWAMessageUseCase,
    CreatePrivateTextMessageFromWAMessageUseCase,
    CreatePrivateUnknownMessageFromWAMessageUseCase,
    CreatePrivateVCardMessageFromWAMessageUseCase,
    CreatePrivateVideoMessageFromWAMessageUseCase,
    CreatePrivateVoiceMessageFromWAMessageUseCase,
    CreateMessageMediaFromWAMessageUseCase,
    CreateContactFromWAContactUseCase,
    CreateGroupAudioMessageFromWAMessageUseCase,
    CreateGroupDocumentMessageFromWAMessageUseCase,
    CreateGroupImageMessageFromWAMessageUseCase,
    CreateGroupMultiVCardMessageFromWAMessageUseCase,
    CreateGroupRevokedMessageFromWAMessageUseCase,
    CreateGroupTextMessageFromWAMessageUseCase,
    CreateGroupUnknownMessageFromWAMessageUseCase,
    CreateGroupVCardMessageFromWAMessageUseCase,
    CreateGroupVideoMessageFromWAMessageUseCase,
    CreateGroupVoiceMessageFromWAMessageUseCase,

    WWJSHandleChatUnreadCount,
    HandleChangeWAChatUnreadCount,

    WWJSHandleMessageAck,
    HandleChangeWAMessageACK,

    WWJSHandleMessageRevokedEveryone,
    HandleRevokeWAMessage,
  ],
})
export class WWJSHandlersModule {}
