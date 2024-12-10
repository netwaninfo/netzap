import { StorageService } from '@/domain/chat/application/services/storage-service'
import { Module } from '@nestjs/common'
import { FileSystemStorageService } from './filesystem/filesystem-storage.service'

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
