type BaseIdentifier = { equals(id: unknown): boolean }

export abstract class WAEntity<Props, Identifier extends BaseIdentifier> {
	private _id: Identifier
	protected props: Props

	protected constructor(props: Props, id: Identifier) {
		this.props = props
		this._id = id
	}

	get id() {
		return this._id
	}

	protected set(newProps: Partial<Props>) {
		this.props = Object.assign({}, this.props, newProps)
	}

	equals(entity: WAEntity<unknown, BaseIdentifier>) {
		if (entity === this) {
			return true
		}

		if (entity.id.equals(this._id)) {
			return true
		}

		return false
	}
}
