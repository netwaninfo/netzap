import {
  FetchInstancesRequestQuery,
  FetchInstancesResponseBody,
  fetchInstancesResponseBodySchema,
} from '@netzap/http/chat'
import { AbstractEndpoint } from './abstract'

interface FetchRequest {
  query: FetchInstancesRequestQuery
}

export class InstancesAPI extends AbstractEndpoint {
  async fetch({ query }: FetchRequest): Promise<FetchInstancesResponseBody> {
    const response = await this.client
      .query(query)
      .get('/wa/instances')
      .json(data => fetchInstancesResponseBodySchema.parse(data))

    return response
  }
}
