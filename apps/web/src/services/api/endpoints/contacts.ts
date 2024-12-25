import {
  type FetchContactsRequestParams,
  type FetchContactsRequestQuery,
  type FetchContactsResponseBody,
  fetchContactsResponseBodySchema,
} from '@netzap/http/chat'
import { AbstractEndpoint } from './abstract'

interface FetchRequest {
  query: FetchContactsRequestQuery
  params: FetchContactsRequestParams
}

export class ContactsAPI extends AbstractEndpoint {
  async fetch({
    params,
    query,
  }: FetchRequest): Promise<FetchContactsResponseBody> {
    const { instanceId } = params

    const response = await this.client
      .query(query)
      .get(`/wa/${instanceId}/contacts`)
      .json(data => fetchContactsResponseBodySchema.parse(data))

    return response
  }
}
