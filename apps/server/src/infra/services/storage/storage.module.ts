import { StorageService } from '@/domain/chat/application/services/storage-service'
import { Module } from '@nestjs/common'
import { R2StorageService } from './r2/r2-storage.service'

@Module({
  providers: [
    {
      provide: StorageService,
      useClass: R2StorageService,
    },
  ],
  exports: [StorageService],
})
export class StorageModule {}
