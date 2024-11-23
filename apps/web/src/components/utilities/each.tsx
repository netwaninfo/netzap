import {
  Children,
  ReactElement,
  type ReactNode,
  cloneElement,
  useId,
} from 'react'

interface EachRenderProps<T> {
  id: string
  item: T
  index: number
}

type RenderFunction<T> = (props: EachRenderProps<T>) => ReactNode

interface EachProps<T> {
  items: T[]
  render: RenderFunction<T>
}

const Each = <T,>({ items, render }: EachProps<T>) => {
  return Children.toArray(
    items
      .map((item, index) => ({ item, index, id: useId() }))
      .map(({ id, ...props }) =>
        cloneElement(render({ ...props, id }) as ReactElement, { key: id })
      )
  )
}
Each.displayName = 'Each'

export { Each }
