import {
  Children,
  type ReactElement,
  type ReactNode,
  cloneElement,
  useId,
} from 'react'

interface RenderFunctionProps<T> {
  item: T
  index: number
}

type RenderFunction<T> = (props: RenderFunctionProps<T>) => ReactNode

interface EachProps<T> {
  items: T[]
  render: RenderFunction<T>
}

function Each<T>({ items, render }: EachProps<T>) {
  const refId = useId()

  return Children.toArray(
    items.map((item, index) =>
      cloneElement(render({ index, item }) as ReactElement, {
        key: String(`${refId}-${index}`),
      })
    )
  )
}

export { Each, type EachProps }
