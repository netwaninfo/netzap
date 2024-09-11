import { Pagination } from '../pagination'

describe('Pagination ', () => {
  test('create', () => {
    const pagination = Pagination.create({ page: 1, limit: 2, rows: 4 })

    expect(pagination).toBeTruthy()
  })

  test('pages', () => {
    const pagination = Pagination.create({ page: 1, limit: 2, rows: 5 })

    expect(pagination.pages).toBe(3)
  })

  test('nextPage', () => {
    const pagination = Pagination.create({
      page: 1,
      limit: 1,
      rows: 2,
    })

    expect(pagination.nextPage).toEqual(2)
  })

  test('prevPage', () => {
    const pagination = Pagination.create({
      page: 2,
      limit: 1,
      rows: 2,
    })

    expect(pagination.prevPage).toEqual(1)
  })

  test('limit', () => {
    expect(Pagination.limit()).toEqual(50)
    expect(Pagination.limit(1)).toEqual(1)
  })

  test('skip', () => {
    const skip = Pagination.skip({ limit: 10, page: 2 })

    expect(skip).toEqual(10)
  })
})
