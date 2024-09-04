import { Module } from '@nestjs/common'

import { HttpContactsModule } from './contacts/http-contacts.module'
import { HttpInstancesModule } from './instances/http-instances.module'

@Module({
	imports: [HttpInstancesModule, HttpContactsModule],
})
export class ChatHttpModule {}
