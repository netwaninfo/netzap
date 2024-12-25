import { remeda } from '@/lib/remeda'
import type { Contact } from '@netzap/entities/chat'

function useNameOfAuthor(author: Contact) {
  if (author.isMe) return 'Você'

  const nameIsPhone = author.name === author.phone
  if (nameIsPhone) return author.name

  const chunks = author.name.split(' ')
  const firstName = chunks.at(0)

  const isLargeName =
    chunks.length > 2 || author.name.replace(/\s+/, '').length > 9

  const name =
    isLargeName && !remeda.isEmpty(firstName) ? firstName : author.name

  if (author.isMyContact) return name

  return `~${name}`
}

export { useNameOfAuthor }
