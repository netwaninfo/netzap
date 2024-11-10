import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { faker } from '@/test/lib/faker'
import { User } from '../user'

describe('User', () => {
  it('should be able to create', () => {
    const user = User.create({
      name: faker.person.firstName(),
      email: faker.internet.email(),
      displayName: faker.internet.username(),
      imageUrl: faker.image.url(),
      refId: makeUniqueEntityID(),
    })

    expect(user).toBeTruthy()
  })
})
