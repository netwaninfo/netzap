import { fetcher } from './fetcher'

import { ChatsAPI } from './endpoints/chats'
import { InstancesAPI } from './endpoints/instances'
import { UsersAPI } from './endpoints/users'

export function createAPIClient() {
  return {
    users: new UsersAPI(fetcher),
    instances: new InstancesAPI(fetcher),
    chats: new ChatsAPI(fetcher),
  }
}
