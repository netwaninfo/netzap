import { Pagination } from '@/domain/shared/entities/pagination'
import { PaginationResponseSchema } from '@netzap/contracts/http'

export class PaginationPresenter {
	static toHttp(pagination: Pagination): PaginationResponseSchema {
		return {
			current: pagination.page,
			pages: pagination.pages,
			next: pagination.nextPage,
			prev: pagination.prevPage,
		}
	}
}
