import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { makeUser } from '@/test/factories/users/make-user.js'
import { InMemoryUsersRepository } from '@/test/repositories/users/in-memory-users-repository.js'
import { GetUserUseCase } from '../get-user-use-case.js'

describe('GetUserUseCase', () => {
  let usersRepository: InMemoryUsersRepository

  let sut: GetUserUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()

    sut = new GetUserUseCase(usersRepository)
  })

  it('should be able to get an user', async () => {
    const userId = makeUniqueEntityID()
    usersRepository.items.push(makeUser({}, userId))

    const response = await sut.execute({ userId })

    expect(response.isSuccess()).toBe(true)
    if (response.isFailure()) return

    const { user } = response.value
    expect(user).toBeTruthy()
  })
})
