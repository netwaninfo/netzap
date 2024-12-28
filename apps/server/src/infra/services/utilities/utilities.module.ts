import { Module } from '@nestjs/common'

import { UtilitiesDateModule } from './date/utilities-date.module.js'
import { UtilitiesNestJSModule } from './nestjs/utilities-nestjs.module.js'

@Module({
  imports: [UtilitiesNestJSModule, UtilitiesDateModule],
  exports: [UtilitiesNestJSModule, UtilitiesDateModule],
})
export class UtilitiesModule {}
