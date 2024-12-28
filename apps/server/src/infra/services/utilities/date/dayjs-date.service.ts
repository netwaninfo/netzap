import dayjs, { Dayjs } from 'dayjs'

import { DateService } from '@/domain/chat/application/services/date-service.js'

export class DayjsDateService implements DateService {
  private ref: Dayjs

  constructor(date: Dayjs | Date) {
    this.ref = dayjs(date)
  }

  toDate(): Date {
    return this.ref.toDate()
  }

  fromUnix(timestamp: number): DateService {
    this.ref = dayjs.unix(timestamp)

    return this
  }
}
