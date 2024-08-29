import { Module } from '@nestjs/common'

import { HttpInstancesModule } from './instances/http-instances.module'

@Module({
	imports: [HttpInstancesModule],
})
export class ChatHttpModule {}
