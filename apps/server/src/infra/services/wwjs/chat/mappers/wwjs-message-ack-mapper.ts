import { MessageStatus } from '@netzap/entities/chat'
import { WWJSMessageACK } from '../../types/wwjs-enums'

const DOMAIN_MAPPER: { [key in WWJSMessageACK]: MessageStatus } = {
  [WWJSMessageACK.ACK_ERROR]: 'error',
  [WWJSMessageACK.ACK_PENDING]: 'pending',
  [WWJSMessageACK.ACK_SERVER]: 'sent',
  [WWJSMessageACK.ACK_DEVICE]: 'sent',
  [WWJSMessageACK.ACK_READ]: 'read',
  [WWJSMessageACK.ACK_PLAYED]: 'played',
}

export class WWJSMessageACKMapper {
  static toDomain(raw: WWJSMessageACK): MessageStatus {
    return DOMAIN_MAPPER[raw]
  }
}
