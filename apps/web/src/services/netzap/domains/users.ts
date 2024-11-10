import { type User } from '@netzap/entities/users'
import { getMeResponseBodySchema } from '@netzap/http/users'
import { type Wretch } from 'wretch'

export class UsersAPI {
  constructor(private client: Wretch) {}

  async getMe(): Promise<User> {
    const response = await this.client
      .get('/users/me')
      .json(data => getMeResponseBodySchema.parse(data))

    const { data: user } = response

    return user
  }
}
