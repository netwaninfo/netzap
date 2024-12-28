import { type Either, failure, success } from '@/core/either.js'
import { UnhandledError } from '@/domain/shared/errors/unhandled-error.js'
import type { RequestFunction } from './types/request-function.js'

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
