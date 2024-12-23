import { SetOptional } from 'type-fest'

interface ParallelProcessorProps<T> {
  items: T[]
  concurrency: number
}

type ParallelProcessorMethod<T, R> = (item: T) => Promise<R>

export class ParallelProcessor<T> {
  protected props: ParallelProcessorProps<T>

  protected constructor(props: ParallelProcessorProps<T>) {
    this.props = props
  }

  private get items() {
    return this.props.items
  }

  private get concurrency() {
    return this.props.concurrency
  }

  private async limiter(concurrency = 1) {
    const pkg = await import('p-limit')

    return pkg.default(concurrency)
  }

  async processItem<R>(method: ParallelProcessorMethod<T, R>) {
    const limit = await this.limiter(this.concurrency)

    return await Promise.all(this.items.map(item => limit(() => method(item))))
  }

  static create<T>({
    items,
    concurrency = 4,
  }: SetOptional<ParallelProcessorProps<T>, 'concurrency'>) {
    return new ParallelProcessor({ items, concurrency })
  }
}