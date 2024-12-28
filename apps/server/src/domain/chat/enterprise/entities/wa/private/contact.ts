import type { Except, SetOptional } from 'type-fest'
import type { WAEntityID } from '../../value-objects/wa-entity-id.js'
import { WAContact, type WAContactProps } from '../contact.js'

export interface WAPrivateContactProps extends WAContactProps {
  isMe: boolean
  isGroup: false
  isBusiness: boolean
  isEnterprise: boolean
  isInstance: boolean
  isWAContact: boolean
  isMyContact: boolean
}

export class WAPrivateContact extends WAContact<WAPrivateContactProps> {
  get isMe() {
    return this.props.isMe
  }

  get isGroup() {
    return this.props.isGroup
  }

  get isBusiness() {
    return this.props.isBusiness
  }

  get isEnterprise() {
    return this.props.isEnterprise
  }

  get isInstance() {
    return this.props.isInstance
  }

  get isWAContact() {
    return this.props.isWAContact
  }

  get isMyContact() {
    return this.isWAContact && this.props.isMyContact
  }

  get isUnknown() {
    return !this.isMyContact
  }

  get ref() {
    return `${this.instanceId.toString()}/${this.id.toString()}/${this.props.isGroup}`
  }

  static create(
    props: Except<
      SetOptional<
        WAPrivateContactProps,
        'name' | 'shortName' | 'pushName' | 'imageUrl' | 'isInstance' | 'isMe'
      >,
      'isGroup'
    >,
    id: WAEntityID
  ) {
    return new WAPrivateContact(
      {
        ...props,
        isGroup: false,
        name: props.name ?? null,
        shortName: props.shortName ?? null,
        pushName: props.pushName ?? null,
        imageUrl: props.imageUrl ?? null,
        isInstance: props.isInstance ?? false,
        isMe: props.isMe ?? false,
      },
      id
    )
  }
}
