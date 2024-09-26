import { DateService } from '@/domain/chat/application/services/date-service'
import { Module } from '@nestjs/common'
import { DayjsDateService } from './date/dayjs-date.service'

@Module({
  providers: [
    {
      provide: DateService,
      useClass: DayjsDateService,
    },
  ],
  exports: [DateService],
})
export class UtilitiesModule {}
