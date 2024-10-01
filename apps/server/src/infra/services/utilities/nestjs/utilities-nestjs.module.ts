import { DiscoveryModule } from '@golevelup/nestjs-discovery'
import { Module } from '@nestjs/common'

import { DiscoveryService } from './discovery.service'

@Module({
  imports: [DiscoveryModule],
  providers: [DiscoveryService],
  exports: [DiscoveryService],
})
export class UtilitiesNestJSModule {}
