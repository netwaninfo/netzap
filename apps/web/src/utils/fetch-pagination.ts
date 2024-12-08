import { PaginationResponse } from '@netzap/http/shared'

export class FetchPagination {
  static getNextPage(pagination: PaginationResponse) {
    return pagination.current === pagination.next ? null : pagination.next
  }

  static getPrevPage(pagination: PaginationResponse) {
    return pagination.current === pagination.prev ? null : pagination.prev
  }
}
