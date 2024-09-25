import { Module } from '@nestjs/common'

import { StorageModule } from './storage/storage.module'
import { WWJSModule } from './wwjs/wwjs.module'

@Module({
  imports: [WWJSModule, StorageModule],
  exports: [WWJSModule, StorageModule],
})
export class ServicesModule {}
