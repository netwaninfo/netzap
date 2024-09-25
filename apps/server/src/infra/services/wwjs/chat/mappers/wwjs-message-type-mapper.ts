import type { MessageType } from '@netzap/contracts/chat'
import { WWJSMessageTypes } from '../../types/wwjs-enums'

const DOMAIN_MAPPER: Partial<{
  [key in WWJSMessageTypes]: MessageType
}> = {
  [WWJSMessageTypes.AUDIO]: 'audio',
  [WWJSMessageTypes.DOCUMENT]: 'document',
  [WWJSMessageTypes.IMAGE]: 'image',
  [WWJSMessageTypes.CONTACT_CARD_MULTI]: 'multi_vcard',
  [WWJSMessageTypes.REVOKED]: 'revoked',
  [WWJSMessageTypes.TEXT]: 'text',
  [WWJSMessageTypes.CONTACT_CARD]: 'vcard',
  [WWJSMessageTypes.VIDEO]: 'video',
  [WWJSMessageTypes.VOICE]: 'voice',
  [WWJSMessageTypes.UNKNOWN]: 'unknown',
}

export class WWJSMessageTypeMapper {
  static toDomain(raw: WWJSMessageTypes): MessageType {
    return DOMAIN_MAPPER[raw] ?? 'unknown'
  }
}
