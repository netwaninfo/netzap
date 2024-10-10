interface ChunkProcessorFromArrayParams<T> {
  array: T[]
  amount?: number
}

type ChunkProcessorMethod<T, R> = (item: T) => Promise<R>

interface ChunkProcessorProps<T> {
  chunks: T[][]
}

export class ChunkProcessor<T> {
  protected props: ChunkProcessorProps<T>

  protected constructor(props: ChunkProcessorProps<T>) {
    this.props = props
  }

  private get chunks() {
    return this.props.chunks
  }

  async processChunk<R>(method: ChunkProcessorMethod<T[], R>) {
    return await Promise.all(this.chunks.map(chunk => method(chunk)))
  }

  static fromArray<T>({ array, amount = 5 }: ChunkProcessorFromArrayParams<T>) {
    const chunks: T[][] = []
    const chunkSize = Math.ceil(array.length / amount)

    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize))
    }

    return new ChunkProcessor({ chunks })
  }
}
