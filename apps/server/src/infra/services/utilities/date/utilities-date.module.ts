import { Module } from '@nestjs/common'

import { DateService } from '@/domain/chat/application/services/date-service.js'
import { DayjsDateService } from './dayjs-date.service.js'

@Module({
  providers: [
    {
      provide: DateService,
      useClass: DayjsDateService,
    },
  ],
  exports: [DateService],
})
export class UtilitiesDateModule {}
