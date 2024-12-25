import { Each, type EachRenderItem } from './each'

interface SkeletonListProps {
  amount?: number
  render: EachRenderItem<unknown>
}

function SkeletonList({ amount = 4, render }: SkeletonListProps) {
  return <Each items={Array.from(Array(amount))} render={render} />
}

export { SkeletonList, type SkeletonListProps }
