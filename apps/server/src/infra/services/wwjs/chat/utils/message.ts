import timers from 'node:timers/promises'

import { WWJSMessage, WWJSMessageMedia } from '../../types/wwjs-entities'
import { WWJSMessageTypes } from '../../types/wwjs-enums'

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
}
