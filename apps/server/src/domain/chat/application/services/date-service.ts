export abstract class DateService {
  abstract toDate(): Date
  abstract fromUnix(timestamp: number): DateService
}
