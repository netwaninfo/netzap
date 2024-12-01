import { Contact } from '@netzap/entities/chat'

export function getMessageAuthorName(author: Contact) {
  if (author.isMe) return 'Você:'

  const isLargeName = author.name.length > 6
  const label = isLargeName ? (author.name.split(' ')[0] ?? '') : author.name

  return label.concat(':')
}
