import {
  FetchChatsRequestParams,
  FetchChatsRequestQuery,
  FetchChatsResponseBody,
  fetchChatsResponseBodySchema,
} from '@netzap/http/chat'
import { AbstractEndpoint } from './abstract'

interface FetchRequest {
  query: FetchChatsRequestQuery
  params: FetchChatsRequestParams
}

export class ChatsAPI extends AbstractEndpoint {
  async fetch({
    params,
    query,
  }: FetchRequest): Promise<FetchChatsResponseBody> {
    fetchChatsResponseBodySchema.parse({
      data: [{}],
      pagination: {
        current: 0,
        pages: 0,
        next: 0,
        prev: 0,
      },
    })

    return null

    const { instanceId } = params

    const response = await this.client
      .query(query)
      .get(`/wa/${instanceId}/chats`)
      .json(data => fetchChatsResponseBodySchema.parse(data))

    return response
  }
}
