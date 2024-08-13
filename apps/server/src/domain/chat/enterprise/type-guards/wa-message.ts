import { WAGroupMessage } from '../entities/wa/group/message'
import { WAPrivateMessage } from '../entities/wa/private/message'
import type { WAMessage } from '../types/wa-message'

export function isWAPrivateMessage(
	message: WAMessage,
): message is WAPrivateMessage {
	return message instanceof WAPrivateMessage
}

export function isWAGroupMessage(
	message: WAMessage,
): message is WAGroupMessage {
	return message instanceof WAGroupMessage
}
