import type { SetNonNullable, SetOptional } from 'type-fest'
import type { WAMessageID } from '../../value-objects/wa-message-id'
import { WAMessage, type WAMessageProps } from '../message'
import type { WAPrivateContact } from '../private/contact'

export interface WAGroupMessageProps extends WAMessageProps {
  author: WAPrivateContact
  quoted: WAGroupMessage | null
}

export class WAGroupMessage extends WAMessage<WAGroupMessageProps> {
  get author() {
    return this.props.author
  }

  get quoted() {
    return this.props.quoted
  }

  hasQuoted(): this is SetNonNullable<WAGroupMessageProps, 'quoted'> {
    return !!this.quoted
  }

  static create(
    props: SetOptional<WAGroupMessageProps, 'media' | 'quoted' | 'contacts'>,
    id: WAMessageID
  ) {
    return new WAGroupMessage(
      {
        ...props,
        quoted: props.quoted ?? null,
        media: props.media ?? null,
        contacts: props.contacts ?? null,
      },
      id
    )
  }
}
