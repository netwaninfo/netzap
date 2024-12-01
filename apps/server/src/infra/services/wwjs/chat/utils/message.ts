import timers from 'node:timers/promises'

import { WWJSMessage, WWJSMessageMedia } from '../../types/wwjs-entities'
import { WWJSMessageTypes } from '../../types/wwjs-enums'

const MESSAGES_TYPES_TO_IGNORE = [
  WWJSMessageTypes.E2E_NOTIFICATION,
  WWJSMessageTypes.GROUP_NOTIFICATION,
  WWJSMessageTypes.GROUP_INVITE,
  WWJSMessageTypes.BROADCAST_NOTIFICATION,
  WWJSMessageTypes.CALL_LOG,
  WWJSMessageTypes.CIPHERTEXT,
  WWJSMessageTypes.NOTIFICATION,
  WWJSMessageTypes.NOTIFICATION_TEMPLATE,
  WWJSMessageTypes.GP2,
]

export class MessageUtils {
  static hasContacts(message: WWJSMessage) {
    return (
      (message.type === WWJSMessageTypes.CONTACT_CARD ||
        message.type === WWJSMessageTypes.CONTACT_CARD_MULTI) &&
      !!message.vCards.length
    )
  }

  static isGroupMessage(message: WWJSMessage) {
    return message.id._serialized.includes('@g.us')
  }

  static getMediaOrNull(
    message: WWJSMessage
  ): Promise<WWJSMessageMedia | null> {
    const TIMEOUT_IN_MS = 1000 * 5 // 5 seconds

    return Promise.race([
      message.downloadMedia(),
      timers.setTimeout(TIMEOUT_IN_MS, null),
    ])
  }

  static canIgnore(type: WWJSMessageTypes) {
    return MESSAGES_TYPES_TO_IGNORE.includes(type)
  }
}
