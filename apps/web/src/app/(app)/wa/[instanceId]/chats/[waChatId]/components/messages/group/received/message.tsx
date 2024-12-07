import { GroupMessage } from '@netzap/entities/chat'
import { ReceivedGroupAudioMessage } from './audio-message'
import { ReceivedGroupDocumentMessage } from './document-message'
import { ReceivedGroupImageMessage } from './image-message'
import { ReceivedGroupTextMessage } from './text-message'
import { ReceivedGroupUnknownMessage } from './unknown-message'
import { ReceivedGroupVideoMessage } from './video-message'
import { ReceivedGroupVoiceMessage } from './voice-message'

interface ReceivedGroupMessageProps {
  message: GroupMessage
}

export function ReceivedGroupMessage({ message }: ReceivedGroupMessageProps) {
  switch (message.type) {
    case 'text':
      return <ReceivedGroupTextMessage message={message} />

    case 'audio':
      return <ReceivedGroupAudioMessage message={message} />

    case 'voice':
      return <ReceivedGroupVoiceMessage message={message} />

    case 'image':
      return <ReceivedGroupImageMessage message={message} />

    case 'video':
      return <ReceivedGroupVideoMessage message={message} />

    case 'document':
      return <ReceivedGroupDocumentMessage message={message} />

    default:
      return <ReceivedGroupUnknownMessage message={message} />
  }
}
