import { Injectable } from '@nestjs/common'

import { DiscoveryService as RawDiscoveryService } from '@golevelup/nestjs-discovery'

interface NestJSDiscoveryServiceProvidersParams {
  metadataKey: string
}

@Injectable()
export class DiscoveryService {
  constructor(private raw: RawDiscoveryService) {}

  async getInstancesProviders<I>({
    metadataKey,
  }: NestJSDiscoveryServiceProvidersParams) {
    const providers = await this.raw.providersWithMetaAtKey(metadataKey)

    return providers.map(provider => provider.discoveredClass.instance as I)
  }
}
