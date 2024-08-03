import { faker } from '@/test/lib/faker'
import { Instance } from '../instance'

describe('Instance', () => {
	it('should be able to create', () => {
		const instance = Instance.create({
			name: faker.company.name(),
		})

		expect(instance).toBeTruthy()
	})

	it('should be able to set is initialized', () => {
		const instance = Instance.create({
			name: faker.company.name(),
		})

		instance.initialized()
		expect(instance.state).toBe('initialized')
	})

	it('should be able to set is authenticated', () => {
		const instance = Instance.create({
			name: faker.company.name(),
		})

		instance.authenticated()
		expect(instance.state).toBe('authenticated')
	})

	it('should be able to set is failed', () => {
		const instance = Instance.create({
			name: faker.company.name(),
		})

		instance.failed()
		expect(instance.state).toBe('failed')
	})

	it('should be able to set is connected', () => {
		const instance = Instance.create({
			name: faker.company.name(),
		})

		instance.connected()
		expect(instance.state).toBe('connected')
	})

	it('should be able to set is disconnected', () => {
		const instance = Instance.create({
			name: faker.company.name(),
		})

		instance.disconnected()
		expect(instance.state).toBe('disconnected')
	})
})
