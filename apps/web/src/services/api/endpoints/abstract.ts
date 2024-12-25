import type { Fetcher } from '../fetcher'

export class AbstractEndpoint {
  constructor(protected client: Fetcher) {}
}
