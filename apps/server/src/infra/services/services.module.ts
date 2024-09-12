import { Module } from '@nestjs/common'
import { WWJSModule } from './wwjs/wwjs.module'

@Module({
  imports: [WWJSModule],
  exports: [WWJSModule],
})
export class ServicesModule {}
