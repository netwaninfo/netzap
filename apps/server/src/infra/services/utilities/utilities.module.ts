import { Module } from '@nestjs/common'

import { UtilitiesDateModule } from './date/utilities-date.module'
import { UtilitiesNestJSModule } from './nestjs/utilities-nestjs.module'

@Module({
  imports: [UtilitiesNestJSModule, UtilitiesDateModule],
  exports: [UtilitiesNestJSModule, UtilitiesDateModule],
})
export class UtilitiesModule {}
