import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { DatabaseModule } from './database/database.module'
import { EnvModule } from './env/env.module'
import { HttpModule } from './http/http.module'

@Module({
	imports: [EnvModule, DatabaseModule, AuthModule, HttpModule],
})
export class AppModule {}
