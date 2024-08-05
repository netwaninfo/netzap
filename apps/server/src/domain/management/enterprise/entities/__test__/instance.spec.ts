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

	it('should be able to set is initialized', () => {
		const instance = Instance.create({
			name: faker.company.name(),
			phone: faker.phone.number(),
		})

		instance.initialized()
		expect(instance.status).toBe('initialized')
	})

	it('should be able to set is authenticated', () => {
		const instance = Instance.create({
			name: faker.company.name(),
			phone: faker.phone.number(),
		})

		instance.authenticated()
		expect(instance.status).toBe('authenticated')
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
