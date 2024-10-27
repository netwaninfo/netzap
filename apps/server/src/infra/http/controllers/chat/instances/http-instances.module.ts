import { CreateChatFromWAChatUseCase } from '@/domain/chat/application/use-cases/chats/create-chat-from-wa-chat-use-case'
import { CreateGroupChatFromWAChatUseCase } from '@/domain/chat/application/use-cases/chats/create-group-chat-from-wa-chat-use-case'
import { CreatePrivateChatFromWAChatUseCase } from '@/domain/chat/application/use-cases/chats/create-private-chat-from-wa-chat-use-case'
import { ImportChatsFromInstanceUseCase } from '@/domain/chat/application/use-cases/chats/import-chats-from-instance-use-case'
import { LinkChatLastMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/chats/link-chat-last-message-from-wa-message-use-case'
import { CreateContactFromWAContactUseCase } from '@/domain/chat/application/use-cases/contacts/create-contact-from-wa-contact-use-case'
import { CreateContactsFromWAContactsUseCase } from '@/domain/chat/application/use-cases/contacts/create-contacts-from-wa-contacts-use-case'
import { ImportContactsFromInstanceUseCase } from '@/domain/chat/application/use-cases/contacts/import-contacts-from-instance-use-case'
import { CreateGroupFromWAContactUseCase } from '@/domain/chat/application/use-cases/groups/create-group-from-wa-contact-use-case'
import { FetchInstancesUseCase } from '@/domain/chat/application/use-cases/instances/fetch-instances-use-case'
import { ImportFromInstanceUseCase } from '@/domain/chat/application/use-cases/instances/import-from-instance-use-case'
import { CreateMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/create-message-from-wa-message-use-case'
import { CreateMessageMediaFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/create-message-media-from-wa-message-use-case'
import { CreateGroupAudioMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/group/create-group-audio-message-from-wa-message-use-case'
import { CreateGroupDocumentMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/group/create-group-document-message-from-wa-message-use-case'
import { CreateGroupImageMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/group/create-group-image-message-from-wa-message-use-case'
import { CreateGroupMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/group/create-group-message-from-wa-message-use-case'
import { CreateGroupMultiVCardMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/group/create-group-multi-card-message-from-wa-message-use-case'
import { CreateGroupRevokedMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/group/create-group-revoked-message-from-wa-message-use-case'
import { CreateGroupTextMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/group/create-group-text-message-from-wa-message-use-case'
import { CreateGroupUnknownMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/group/create-group-unknown-message-from-wa-message-use-case'
import { CreateGroupVCardMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/group/create-group-v-card-message-from-wa-message-use-case'
import { CreateGroupVideoMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/group/create-group-video-message-from-wa-message-use-case'
import { CreateGroupVoiceMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/group/create-group-voice-message-from-wa-message-use-case'
import { ImportMessagesFromInstanceUseCase } from '@/domain/chat/application/use-cases/messages/import-messages-from-instance-use-case'
import { CreatePrivateAudioMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/private/create-private-audio-message-from-wa-message-use-case'
import { CreatePrivateDocumentMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/private/create-private-document-message-from-wa-message-use-case'
import { CreatePrivateImageMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/private/create-private-image-message-from-wa-message-use-case'
import { CreatePrivateMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/private/create-private-message-from-wa-message-use-case'
import { CreatePrivateMultiVCardMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/private/create-private-multi-card-message-from-wa-message-use-case'
import { CreatePrivateRevokedMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/private/create-private-revoked-message-from-wa-message-use-case'
import { CreatePrivateTextMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/private/create-private-text-message-from-wa-message-use-case'
import { CreatePrivateUnknownMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/private/create-private-unknown-message-from-wa-message-use-case'
import { CreatePrivateVCardMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/private/create-private-v-card-message-from-wa-message-use-case'
import { CreatePrivateVideoMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/private/create-private-video-message-from-wa-message-use-case'
import { CreatePrivateVoiceMessageFromWAMessageUseCase } from '@/domain/chat/application/use-cases/messages/private/create-private-voice-message-from-wa-message-use-case'
import { Module } from '@nestjs/common'
import { FetchInstancesController } from './fetch-instances.controller'
import { ImportFromInstanceController } from './import-from-instance.controller'

@Module({
  controllers: [FetchInstancesController, ImportFromInstanceController],
  providers: [
    FetchInstancesUseCase,

    ImportFromInstanceUseCase,
    ImportContactsFromInstanceUseCase,
    ImportChatsFromInstanceUseCase,
    ImportMessagesFromInstanceUseCase,
    CreateContactsFromWAContactsUseCase,
    CreateChatFromWAChatUseCase,
    CreateGroupChatFromWAChatUseCase,
    CreatePrivateChatFromWAChatUseCase,
    CreateGroupFromWAContactUseCase,
    LinkChatLastMessageFromWAMessageUseCase,
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
  ],
})
export class HttpInstancesModule {}
