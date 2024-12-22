import type { ReactNode } from 'react'
import { Each } from '../utilities/each'

interface SkeletonListProps {
  amount?: number
  render: () => ReactNode
}

function SkeletonList({ amount = 4, render }: SkeletonListProps) {
  return <Each items={Array.from(Array(amount))} render={render} />
}

export { SkeletonList, type SkeletonListProps }
