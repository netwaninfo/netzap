import { WWJSContact } from '../../types/wwjs-entities'

export class ContactUtils {
  static isValid(contact: WWJSContact) {
    return contact.id.server === 'c.us' && contact.isWAContact
  }

  static isMyContact(contact: WWJSContact) {
    return ContactUtils.isValid(contact) && contact.isMyContact
  }
}
