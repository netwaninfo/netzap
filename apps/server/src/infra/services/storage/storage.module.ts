import path from 'node:path'
import { StorageService } from '@/domain/chat/application/services/storage-service'
import { EnvService } from '@/infra/env/env.service'
import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { FileSystemStorageService } from './filesystem/filesystem-storage.service'

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      inject: [EnvService],
      useFactory(env: EnvService) {
        return [
          {
            rootPath: path.resolve(process.cwd(), 'tmp'),
            serveRoot: env.get('MEDIA_PUBLIC_PATH'),
          },
        ]
      },
    }),
  ],
  providers: [
    {
      provide: StorageService,
      useClass: FileSystemStorageService,
      // useClass: R2StorageService,
    },
  ],
  exports: [StorageService],
})
export class StorageModule {}
