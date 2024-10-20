import { Either, failure, success } from '@/core/either'
import { UnhandledError } from '@/domain/shared/errors/unhandled-error'
import { RequestFunction } from './types/request-function'

export abstract class RunSafely {
  protected async runSafely<T>(
    request: RequestFunction<T>
  ): Promise<Either<UnhandledError, T>> {
    try {
      return success(await request())
    } catch (error) {
      const err = error as Error
      return failure(new UnhandledError({ message: err.message }))
    }
  }
}
