import { Contact } from '@netzap/entities/chat'

function getMessageAuthorName(author: Contact) {
  if (author.isMe) return 'Você:'

  const isLargeName = author.name.length > 6
  const authorName = isLargeName
    ? (author.name.split(' ')[0] ?? '')
    : author.name

  const label = authorName.concat(':')

  return author.isMyContact ? label : '~'.concat(label)
}

export { getMessageAuthorName }
