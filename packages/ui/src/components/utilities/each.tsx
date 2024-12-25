import type React from 'react'
import { Children } from 'react'

type EachRenderItem<T> = (item: T, index: number) => React.ReactNode

interface EachProps<T> {
  items: T[]
  fallback?: React.ReactNode
  render: EachRenderItem<T>
}

function Each<T>({ items, fallback, render }: EachProps<T>) {
  const isEmpty = !items.length
  if (isEmpty) return fallback ?? null

  return Children.toArray(items.map(render))
}

export { Each, type EachProps, type EachRenderItem }
