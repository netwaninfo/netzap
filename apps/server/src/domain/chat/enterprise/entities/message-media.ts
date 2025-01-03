import { Entity } from '@/core/entities/entity.js'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import type { MimeType } from './value-objects/mime-type.js'

export interface MessageMediaProps {
  url: string
  key: string
  mimeType: MimeType
}

export class MessageMedia extends Entity<MessageMediaProps> {
  get url() {
    return this.props.url
  }

  get key() {
    return this.props.key
  }

  get mimeType() {
    return this.props.mimeType
  }

  static create(props: MessageMediaProps, id?: UniqueEntityID) {
    return new MessageMedia({ ...props }, id)
  }
}
