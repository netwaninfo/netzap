import { Module } from '@nestjs/common'
import { ClerkModule } from './clerk/clerk.module'

@Module({
  imports: [ClerkModule],
  exports: [ClerkModule],
})
export class SSOModule {}
