import bson from 'bson-objectid'

const ObjectID = bson.default

export class UniqueEntityID {
  private value: string

  protected constructor(value?: string) {
    this.value = value ?? new ObjectID().toHexString()
  }

  toString() {
    return this.value
  }

  equals(id: UniqueEntityID) {
    return id.toString() === this.value
  }

  static create(value?: string) {
    return new UniqueEntityID(value)
  }
}
