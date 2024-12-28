import { Module } from '@nestjs/common'

import { StorageService } from '@/domain/chat/application/services/storage-service.js'
import { FileSystemStorageService } from './filesystem/filesystem-storage.service.js'

@Module({
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
