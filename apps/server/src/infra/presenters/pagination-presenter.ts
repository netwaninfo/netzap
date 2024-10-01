import { Pagination } from '@/domain/shared/entities/pagination'
import { PaginationResponse as Output } from '@netzap/http/shared'

export class PaginationPresenter {
  static toOutput(pagination: Pagination): Output {
    return {
      current: pagination.page,
      pages: pagination.pages,
      next: pagination.nextPage,
      prev: pagination.prevPage,
    }
  }
}
