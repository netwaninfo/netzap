import type { DateService } from '@/domain/chat/application/services/date-service.js'
import dayjs, { type Dayjs } from 'dayjs'

export class FakeDateService implements DateService {
  private ref: Dayjs

  constructor(date?: Date)
  constructor(ref?: DateService)
  constructor(date?: Date | DateService) {
    this.ref = dayjs(date && (date instanceof Date ? date : date.toDate()))
  }

  toDate(): Date {
    return this.ref.toDate()
  }

  fromUnix(timestamp: number): FakeDateService {
    return new FakeDateService(dayjs.unix(timestamp).toDate())
  }
}
