import { Module } from '@nestjs/common'

import { SocketModule } from './socket-io/socket.module.js'
import { StorageModule } from './storage/storage.module.js'
import { UtilitiesModule } from './utilities/utilities.module.js'
import { WWJSModule } from './wwjs/wwjs.module.js'

@Module({
  imports: [WWJSModule, StorageModule, UtilitiesModule, SocketModule],
  exports: [WWJSModule, StorageModule, UtilitiesModule, SocketModule],
})
export class ServicesModule {}
