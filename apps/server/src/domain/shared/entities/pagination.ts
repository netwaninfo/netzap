import { ValueObject } from '@/core/entities/value-object'

interface PaginationProps {
	page: number
	rows: number
	limit: number
}

interface PaginationSkipParams {
	page: number
	limit: number
}

export class Pagination extends ValueObject<PaginationProps> {
	get page() {
		return this.props.page
	}

	get rows() {
		return this.props.rows
	}

	get limit() {
		return this.props.limit
	}

	get pages() {
		return Math.ceil(this.rows / this.limit)
	}

	get nextPage() {
		const pageIncrementOne = this.page + 1

		return pageIncrementOne > this.pages ? this.pages : pageIncrementOne
	}

	get prevPage() {
		const pageDecrementOne = this.page - 1

		return pageDecrementOne <= 0 || this.pages <= 0 ? 1 : pageDecrementOne
	}

	static limit = (limit?: number) => limit ?? 50

	static skip = ({ limit, page }: PaginationSkipParams) => (page - 1) * limit

	static create(props: PaginationProps) {
		return new Pagination(props)
	}
}
