import { Module } from '@nestjs/common'

import { AuthModule } from './auth/auth.module.js'
import { DatabaseModule } from './database/database.module.js'
import { EnvModule } from './env/env.module.js'
import { HttpModule } from './http/http.module.js'
import { ServicesModule } from './services/services.module.js'

@Module({
  imports: [EnvModule, DatabaseModule, AuthModule, HttpModule, ServicesModule],
})
export class AppModule {}
