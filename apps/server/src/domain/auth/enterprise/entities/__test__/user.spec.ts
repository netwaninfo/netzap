import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { faker } from '@/test/lib/faker.js'
import { User } from '../user.js'

describe('User', () => {
  it('should be able to create', () => {
    const user = User.create(
      {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        imageUrl: faker.image.url(),
        refId: makeUniqueEntityID(),
      },
      makeUniqueEntityID(faker.string.uuid())
    )

    expect(user).toBeTruthy()
  })
})
