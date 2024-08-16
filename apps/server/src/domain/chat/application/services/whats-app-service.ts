import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { WAEntityID } from '../../enterprise/entities/value-objects/wa-entity-id'
import type { WAMessageID } from '../../enterprise/entities/value-objects/wa-message-id'
import type { WAMessage } from '../../enterprise/types/wa-message'

export interface WhatsAppServiceSendTextMessageParams {
	body: string
	instanceId: UniqueEntityID
	waChatId: WAEntityID
	quotedId?: WAMessageID
}

export abstract class WhatsAppService {
	abstract sendTextMessage(
		params: WhatsAppServiceSendTextMessageParams,
	): Promise<WAMessage>
}
