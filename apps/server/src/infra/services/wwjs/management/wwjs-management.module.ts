import { Module } from '@nestjs/common'

import { WWJSHandlersModule } from './handlers/wwjs-handlers.module.js'

@Module({
  imports: [WWJSHandlersModule],
})
export class WWJSManagementModule {}
