import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'

export function makeUniqueEntityID(override?: string) {
  return UniqueEntityID.create(override)
}
