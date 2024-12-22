import {
  type FetchMessagesRequestParams,
  type FetchMessagesRequestQuery,
  type FetchMessagesResponseBody,
  fetchMessagesResponseBodySchema,
} from '@netzap/http/chat'
import { AbstractEndpoint } from './abstract'

interface FetchRequest {
  query: FetchMessagesRequestQuery
  params: FetchMessagesRequestParams
}

export class MessagesAPI extends AbstractEndpoint {
  async fetch({
    params,
    query,
  }: FetchRequest): Promise<FetchMessagesResponseBody> {
    const { instanceId, waChatId } = params

    const response = await this.client
      .query(query)
      .get(`/wa/${instanceId}/chats/${waChatId}/messages`)
      .json(data => fetchMessagesResponseBodySchema.parse(data))

    return response
  }
}
