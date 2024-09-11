import { faker } from '@/test/lib/faker'
import { Instance } from '../instance'

describe('Instance', () => {
  it('should be able to create', () => {
    const instance = Instance.create({
      name: faker.company.name(),
      phone: faker.phone.number(),
    })

    expect(instance).toBeTruthy()
  })

  it('should be able to set is stopped', () => {
    const instance = Instance.create({
      name: faker.company.name(),
      phone: faker.phone.number(),
    })

    instance.stopped()
    expect(instance.status).toBe('stopped')
  })

  it('should be able to set is starting', () => {
    const instance = Instance.create({
      name: faker.company.name(),
      phone: faker.phone.number(),
    })

    instance.starting()
    expect(instance.status).toBe('starting')
  })

  it('should be able to set is initialized', () => {
    const instance = Instance.create({
      name: faker.company.name(),
      phone: faker.phone.number(),
    })

    const qrCode = faker.string.hexadecimal()
    instance.initialized(qrCode)

    expect(instance.status).toBe('initialized')
    expect(instance.qrCode).toBe(qrCode)
  })

  it('should be able to set is failed', () => {
    const instance = Instance.create({
      name: faker.company.name(),
      phone: faker.phone.number(),
    })

    instance.failed()
    expect(instance.status).toBe('failed')
  })

  it('should be able to set is connected', () => {
    const instance = Instance.create({
      name: faker.company.name(),
      phone: faker.phone.number(),
    })

    instance.connected()
    expect(instance.status).toBe('connected')
  })

  it('should be able to set is disconnected', () => {
    const instance = Instance.create({
      name: faker.company.name(),
      phone: faker.phone.number(),
    })

    instance.disconnected()
    expect(instance.status).toBe('disconnected')
  })
})
