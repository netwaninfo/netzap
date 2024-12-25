import {
  type FetchChatsRequestParams,
  type FetchChatsRequestQuery,
  type FetchChatsResponseBody,
  type GetChatRequestParams,
  type GetChatResponseBody,
  fetchChatsResponseBodySchema,
  getChatResponseBodySchema,
} from '@netzap/http/chat'
import { AbstractEndpoint } from './abstract'

interface FetchRequest {
  query: FetchChatsRequestQuery
  params: FetchChatsRequestParams
}

interface GetRequest {
  params: GetChatRequestParams
}

export class ChatsAPI extends AbstractEndpoint {
  async fetch({
    params,
    query,
  }: FetchRequest): Promise<FetchChatsResponseBody> {
    const { instanceId } = params

    const response = await this.client
      .query(query)
      .get(`/wa/${instanceId}/chats`)
      .json(data => fetchChatsResponseBodySchema.parse(data))

    return response
  }

  async get({ params }: GetRequest): Promise<GetChatResponseBody> {
    const { instanceId, waChatId } = params

    const response = await this.client
      .get(`/wa/${instanceId}/chats/${waChatId}`)
      .json(data => getChatResponseBodySchema.parse(data))

    return response
  }
}
