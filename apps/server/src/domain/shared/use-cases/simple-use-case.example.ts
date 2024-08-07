import { type Either, failure, success } from '@/core/either'
import { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error'

interface SimpleUseCaseExampleRequest {
	body: string
}

type SimpleUseCaseExampleResponse = Either<
	ResourceAlreadyExistsError,
	{
		body: string
	}
>

export class SimpleUseCaseExample {
	// constructor(private simpleExampleRepository: SimpleExampleRepository) {}

	async execute(
		request: SimpleUseCaseExampleRequest,
	): Promise<SimpleUseCaseExampleResponse> {
		const { body } = request

		const hasSomeError = true
		if (hasSomeError) {
			return failure(new ResourceAlreadyExistsError({ id: body }))
		}

		return success({ body })
	}
}
