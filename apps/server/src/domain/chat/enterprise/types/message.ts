import type { PrivateAudioMessage } from '../entities/private/audio-message'
import type { PrivateDocumentMessage } from '../entities/private/document-message'
import type { PrivateImageMessage } from '../entities/private/image-message'
import type { PrivateMultiVCardMessage } from '../entities/private/multi-v-card-message'
import type { PrivateRevokedMessage } from '../entities/private/revoked-message'
import type { PrivateTextMessage } from '../entities/private/text-message'
import type { PrivateUnknownMessage } from '../entities/private/unknown-message'
import type { PrivateVCardMessage } from '../entities/private/v-card-message'
import type { PrivateVideoMessage } from '../entities/private/video-message'
import type { PrivateVoiceMessage } from '../entities/private/voice-message'

import type { GroupAudioMessage } from '../entities/group/audio-message'
import type { GroupDocumentMessage } from '../entities/group/document-message'
import type { GroupImageMessage } from '../entities/group/image-message'
import type { GroupMultiVCardMessage } from '../entities/group/multi-v-card-message'
import type { GroupRevokedMessage } from '../entities/group/revoked-message'
import type { GroupTextMessage } from '../entities/group/text-message'
import type { GroupUnknownMessage } from '../entities/group/unknown-message'
import type { GroupVCardMessage } from '../entities/group/v-card-message'
import type { GroupVideoMessage } from '../entities/group/video-message'
import type { GroupVoiceMessage } from '../entities/group/voice-message'

export type PrivateMessageWithMedia =
	| PrivateAudioMessage
	| PrivateImageMessage
	| PrivateVideoMessage
	| PrivateVoiceMessage
	| PrivateDocumentMessage

export type PrivateMessageCanRevoke =
	| PrivateMessageWithMedia
	| PrivateMultiVCardMessage
	| PrivateTextMessage
	| PrivateUnknownMessage
	| PrivateVCardMessage

export type PrivateMessage = PrivateMessageCanRevoke | PrivateRevokedMessage

export type GroupMessageWithMedia =
	| GroupAudioMessage
	| GroupImageMessage
	| GroupVideoMessage
	| GroupVoiceMessage
	| GroupDocumentMessage

export type GroupMessageCanRevoke =
	| GroupMessageWithMedia
	| GroupMultiVCardMessage
	| GroupTextMessage
	| GroupUnknownMessage
	| GroupVCardMessage

export type GroupMessage = GroupMessageCanRevoke | GroupRevokedMessage

export type Message = PrivateMessage | GroupMessage

export type MessageWithMedia = PrivateMessageWithMedia | GroupMessageWithMedia

export type MessageCanRevoke = PrivateMessageCanRevoke | GroupMessageCanRevoke
