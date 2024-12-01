import { Contact } from '@netzap/entities/chat'

export function getMessageContactNames(contacts: Contact[]) {
  const names = contacts.map(contact => contact.name)

  const label = names
    .slice(0, names.length - 1)
    .join(', ')
    .concat(`e ${names.at(-1)}`)

  return label
}
