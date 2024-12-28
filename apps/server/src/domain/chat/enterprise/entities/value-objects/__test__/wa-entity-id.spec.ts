import { faker } from '@/test/lib/faker.js'
import { WAEntityID } from '../wa-entity-id.js'

describe('WAEntityID', () => {
  it('should be able to create from string', () => {
    const entity = WAEntityID.createFromString(
      faker.helpers.fromRegExp(/[0-9]{13}@(c\.us|g\.us)/)
    )

    expect(entity).toBeTruthy()
  })

  it('should not be able to create from string with invalid format', () => {
    expect(() => WAEntityID.createFromString('')).toThrow(Error)
  })
})
