import { WWJSContact } from '../../types/wwjs-entities'

import timers from 'node:timers/promises'

export class ContactUtils {
  static isValid(contact: WWJSContact) {
    return contact.id.server === 'c.us' && contact.isWAContact
  }

  static isMyContact(contact: WWJSContact) {
    return ContactUtils.isValid(contact) && contact.isMyContact
  }

  static getProfilePicUrlOrNull(contact: WWJSContact) {
    const TIMEOUT_IN_MS = 1000 * 3 // 3 seconds

    return Promise.race([
      contact.getProfilePicUrl(),
      timers.setTimeout(TIMEOUT_IN_MS, null),
    ])
  }
}
