import type { Contact } from '@netzap/entities/chat'

function useNameOfContacts(contacts: Contact[]) {
  const names = contacts.map(contact => contact.name)

  const label = names
    .slice(0, names.length - 1)
    .join(', ')
    .concat(` e ${names.at(-1)}`)

  return label
}

export { useNameOfContacts }
