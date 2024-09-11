import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export function makeUniqueEntityID(override?: string) {
  return UniqueEntityID.create(override)
}
