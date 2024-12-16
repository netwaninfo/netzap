import { PaginationResponse } from '@netzap/http/shared'

export class FetchPagination {
  static getNextPage(pagination: PaginationResponse) {
    return pagination.current === pagination.next || pagination.next === 0
      ? null
      : pagination.next
  }

  static getPrevPage(pagination: PaginationResponse) {
    return pagination.current === pagination.prev || pagination.prev === 0
      ? null
      : pagination.prev
  }
}
