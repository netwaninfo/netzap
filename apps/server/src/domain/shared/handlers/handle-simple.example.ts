import { type Either, failure, success } from '@/core/either'
import { ResourceAlreadyExistsError } from '../errors/resource-already-exists-error'

interface HandleSimpleExampleRequest {
  body: string
}

type HandleSimpleExampleResponse = Either<
  ResourceAlreadyExistsError,
  {
    body: string
  }
>

export class HandleSimpleExample {
  // constructor(private simpleExampleRepository: SimpleExampleRepository) {}

  async execute(
    request: HandleSimpleExampleRequest
  ): Promise<HandleSimpleExampleResponse> {
    const { body } = request

    const hasSomeError = true
    if (hasSomeError) {
      return failure(new ResourceAlreadyExistsError({ id: body }))
    }

    return success({ body })
  }
}
