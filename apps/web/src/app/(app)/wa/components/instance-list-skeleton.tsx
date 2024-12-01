import { SkeletonList } from '@/components/custom/skeleton-list'
import { Skeleton } from '@/components/ui/skeleton'

interface InstanceListSkeletonProps {
  amount?: number
}

export function InstanceListSkeleton({ amount }: InstanceListSkeletonProps) {
  return (
    <SkeletonList
      amount={amount}
      render={() => <Skeleton className="w-full h-16 rounded-lg" />}
    />
  )
}
