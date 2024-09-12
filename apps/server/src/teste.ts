import { UniqueEntityID } from './core/entities/unique-entity-id'

const map: Map<[string, string], string> = new Map()

const first = UniqueEntityID.create()
const second = UniqueEntityID.create(first.toString())

console.log(first === second)

const flag = ['1', '2']

map.set(['1', '2'], '123')
map.set(flag, '1235678')
map.set(['2', '3'], '098765')

console.log(map)
