import { ValueObject } from '@/core/entities/value-object'

export type WAEntityNode = 'c.us' | 'g.us' | 'lid'

export interface WAEntityIDProps {
  node: WAEntityNode
  number: string
}

export class WAEntityID extends ValueObject<WAEntityIDProps> {
  get node() {
    return this.props.node
  }

  get number() {
    return this.props.number
  }

  /**
   * @example '5511945327809-1516769250@g.us'
   * @example '5511985637214@c.us'
   */
  override toString() {
    return `${this.number}@${this.node}`
  }

  override equals(id: WAEntityID) {
    return id.toString() === this.toString()
  }

  static createFromString(value: string) {
    const [waNumber, waNode] = value.split('@')
    if (!waNumber || !waNode) {
      throw new Error(`Invalid value format for "${value}"`)
    }

    const number = waNumber.replaceAll(':', '').trim()
    const node = waNode as WAEntityNode

    return new WAEntityID({ number, node })
  }

  static create(props: WAEntityIDProps) {
    return new WAEntityID(props)
  }
}
