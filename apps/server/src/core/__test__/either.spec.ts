import { type Either, failure, success } from '../either.js'

function doSomeThing(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return success(10)
  }

  return failure('error')
}

describe('Either', () => {
  it('should be able to be a success result', () => {
    const response = doSomeThing(true)

    expect(response.isSuccess()).toBe(true)
    expect(response.isFailure()).toBe(false)
  })

  it('should be able to be a failure result', () => {
    const response = doSomeThing(false)

    expect(response.isFailure()).toBe(true)
    expect(response.isSuccess()).toBe(false)
  })
})
