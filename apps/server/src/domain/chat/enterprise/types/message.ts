import type { PrivateAudioMessage } from '../entities/private/audio-message.js'
import type { PrivateDocumentMessage } from '../entities/private/document-message.js'
import type { PrivateImageMessage } from '../entities/private/image-message.js'
import type { PrivateMultiVCardMessage } from '../entities/private/multi-v-card-message.js'
import type { PrivateRevokedMessage } from '../entities/private/revoked-message.js'
import type { PrivateTextMessage } from '../entities/private/text-message.js'
import type { PrivateUnknownMessage } from '../entities/private/unknown-message.js'
import type { PrivateVCardMessage } from '../entities/private/v-card-message.js'
import type { PrivateVideoMessage } from '../entities/private/video-message.js'
import type { PrivateVoiceMessage } from '../entities/private/voice-message.js'

import type { GroupAudioMessage } from '../entities/group/audio-message.js'
import type { GroupDocumentMessage } from '../entities/group/document-message.js'
import type { GroupImageMessage } from '../entities/group/image-message.js'
import type { GroupMultiVCardMessage } from '../entities/group/multi-v-card-message.js'
import type { GroupRevokedMessage } from '../entities/group/revoked-message.js'
import type { GroupTextMessage } from '../entities/group/text-message.js'
import type { GroupUnknownMessage } from '../entities/group/unknown-message.js'
import type { GroupVCardMessage } from '../entities/group/v-card-message.js'
import type { GroupVideoMessage } from '../entities/group/video-message.js'
import type { GroupVoiceMessage } from '../entities/group/voice-message.js'

export type PrivateMessageWithMedia =
  | PrivateAudioMessage
  | PrivateImageMessage
  | PrivateVideoMessage
  | PrivateVoiceMessage
  | PrivateDocumentMessage

export type PrivateMessageWithContacts =
  | PrivateMultiVCardMessage
  | PrivateVCardMessage

export type PrivateMessageCanRevoke =
  | PrivateMessageWithMedia
  | PrivateMessageWithContacts
  | PrivateTextMessage
  | PrivateUnknownMessage

export type PrivateMessage = PrivateMessageCanRevoke | PrivateRevokedMessage

export type GroupMessageWithMedia =
  | GroupAudioMessage
  | GroupImageMessage
  | GroupVideoMessage
  | GroupVoiceMessage
  | GroupDocumentMessage

export type GroupMessageWithContacts =
  | GroupMultiVCardMessage
  | GroupVCardMessage

export type GroupMessageCanRevoke =
  | GroupMessageWithMedia
  | GroupMessageWithContacts
  | GroupTextMessage
  | GroupUnknownMessage

export type GroupMessage = GroupMessageCanRevoke | GroupRevokedMessage

export type Message = PrivateMessage | GroupMessage

export type MessageWithMedia = PrivateMessageWithMedia | GroupMessageWithMedia

export type MessageCanRevoke = PrivateMessageCanRevoke | GroupMessageCanRevoke

export type RevokedMessage = PrivateRevokedMessage | GroupRevokedMessage
