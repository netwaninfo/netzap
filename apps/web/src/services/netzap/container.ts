import { api } from './api'

import { UsersAPI } from './domains/users'

export const usersAPI = new UsersAPI(api)
