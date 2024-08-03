export abstract class Identifier {
	protected constructor(private value: string) {}

	toString() {
		return this.value
	}

	equals<T extends Identifier>(id: T) {
		return id.toString() === this.value
	}
}
