import { Module } from '@nestjs/common'

import { StorageModule } from './storage/storage.module'
import { UtilitiesModule } from './utilities/utilities.module'
import { WWJSModule } from './wwjs/wwjs.module'

@Module({
  imports: [WWJSModule, StorageModule, UtilitiesModule],
  exports: [WWJSModule, StorageModule, UtilitiesModule],
})
export class ServicesModule {}
