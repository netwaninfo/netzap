import { GroupAudioMessage } from '../entities/group/audio-message'
import { GroupDocumentMessage } from '../entities/group/document-message'
import { GroupImageMessage } from '../entities/group/image-message'
import { GroupMessage as BaseGroupMessage } from '../entities/group/message'
import { GroupMultiVCardMessage } from '../entities/group/multi-v-card-message'
import { GroupRevokedMessage } from '../entities/group/revoked-message'
import { GroupVCardMessage } from '../entities/group/v-card-message'
import { GroupVideoMessage } from '../entities/group/video-message'
import { GroupVoiceMessage } from '../entities/group/voice-message'
import { PrivateAudioMessage } from '../entities/private/audio-message'
import { PrivateDocumentMessage } from '../entities/private/document-message'
import { PrivateImageMessage } from '../entities/private/image-message'
import { PrivateMessage as BasePrivateMessage } from '../entities/private/message'
import { PrivateMultiVCardMessage } from '../entities/private/multi-v-card-message'
import { PrivateRevokedMessage } from '../entities/private/revoked-message'
import { PrivateVCardMessage } from '../entities/private/v-card-message'
import { PrivateVideoMessage } from '../entities/private/video-message'
import { PrivateVoiceMessage } from '../entities/private/voice-message'
import type {
	GroupMessage,
	GroupMessageWithContacts,
	GroupMessageWithMedia,
	Message,
	MessageCanRevoke,
	MessageWithMedia,
	PrivateMessage,
	PrivateMessageWithContacts,
	PrivateMessageWithMedia,
} from '../types/message'

export function isPrivateMessage(message: Message): message is PrivateMessage {
	return message instanceof BasePrivateMessage
}

export function isGroupMessage(message: Message): message is GroupMessage {
	return message instanceof BaseGroupMessage
}

export function isPrivateMessageWithMedia(
	message: Message,
): message is PrivateMessageWithMedia {
	return (
		message instanceof PrivateAudioMessage ||
		message instanceof PrivateImageMessage ||
		message instanceof PrivateVideoMessage ||
		message instanceof PrivateVoiceMessage ||
		message instanceof PrivateDocumentMessage
	)
}

export function isGroupMessageWithMedia(
	message: Message,
): message is GroupMessageWithMedia {
	return (
		message instanceof GroupAudioMessage ||
		message instanceof GroupImageMessage ||
		message instanceof GroupVideoMessage ||
		message instanceof GroupVoiceMessage ||
		message instanceof GroupDocumentMessage
	)
}

export function isPrivateMessageWithContacts(
	message: Message,
): message is PrivateMessageWithContacts {
	return (
		message instanceof PrivateVCardMessage ||
		message instanceof PrivateMultiVCardMessage
	)
}

export function isGroupMessageWithContacts(
	message: Message,
): message is GroupMessageWithContacts {
	return (
		message instanceof GroupVCardMessage ||
		message instanceof GroupMultiVCardMessage
	)
}

export function isMessageWithMedia(
	message: Message,
): message is MessageWithMedia {
	return isPrivateMessageWithMedia(message) || isGroupMessageWithMedia(message)
}

export function isMessageCanRevoke(
	message: Message,
): message is MessageCanRevoke {
	return (
		!(message instanceof PrivateRevokedMessage) ||
		!(message instanceof GroupRevokedMessage)
	)
}
