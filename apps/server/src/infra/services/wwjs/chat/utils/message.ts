import { WWJSMessage } from '../../types/wwjs-entities'
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
}
