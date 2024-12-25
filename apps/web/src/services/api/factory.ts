import { fetcher } from './fetcher'

import { ChatsAPI } from './endpoints/chats'
import { ContactsAPI } from './endpoints/contacts'
import { InstancesAPI } from './endpoints/instances'
import { MessagesAPI } from './endpoints/messages'
import { UsersAPI } from './endpoints/users'

export function createAPIClient() {
  return {
    users: new UsersAPI(fetcher),
    instances: new InstancesAPI(fetcher),
    chats: new ChatsAPI(fetcher),
    contacts: new ContactsAPI(fetcher),
    messages: new MessagesAPI(fetcher),
  }
}
