import { Module } from '@nestjs/common'

import { SocketModule } from './socket-io/socket.module'
import { StorageModule } from './storage/storage.module'
import { UtilitiesModule } from './utilities/utilities.module'
import { WWJSModule } from './wwjs/wwjs.module'

@Module({
  imports: [WWJSModule, StorageModule, UtilitiesModule, SocketModule],
  exports: [WWJSModule, StorageModule, UtilitiesModule, SocketModule],
})
export class ServicesModule {}
