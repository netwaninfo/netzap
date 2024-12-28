import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import {
  User,
  type UserProps,
} from '@/domain/users/enterprise/entities/user.js'
import { faker } from '@/test/lib/faker.js'
import { makeUniqueEntityID } from '../make-unique-entity-id.js'

export const makeUser = (
  override: Partial<UserProps> = {},
  id?: UniqueEntityID
) => {
  const user = User.create(
    {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      displayName: faker.internet.username(),
      imageUrl: faker.image.url(),
      refId: makeUniqueEntityID(),
      ...override,
    },
    id
  )

  return user
}
