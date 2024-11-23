import { GetMeResponseBody, getMeResponseBodySchema } from '@netzap/http/users'
import { AbstractEndpoint } from './abstract'

export class UsersAPI extends AbstractEndpoint {
  async getMe(): Promise<GetMeResponseBody> {
    const response = await this.client
      .get('/users/me')
      .json(data => getMeResponseBodySchema.parse(data))

    return response
  }
}
