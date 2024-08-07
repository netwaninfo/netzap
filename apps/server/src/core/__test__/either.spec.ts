import { type Either, failure, success } from '../either'

function doSomeThing(shouldSuccess: boolean): Either<string, number> {
	if (shouldSuccess) {
		return success(10)
	}

	return failure('error')
}

describe('Either', () => {
	it('should be able to be a success result', () => {
		const result = doSomeThing(true)

		expect(result.isSuccess()).toBe(true)
		expect(result.isFailure()).toBe(false)
	})

	it('should be able to be a failure result', () => {
		const result = doSomeThing(false)

		expect(result.isFailure()).toBe(true)
		expect(result.isSuccess()).toBe(false)
	})
})
