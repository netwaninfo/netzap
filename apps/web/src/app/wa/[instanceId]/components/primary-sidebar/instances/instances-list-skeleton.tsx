import { Skeleton } from '@netzap/ui/components/skeleton'
import { SkeletonList } from '@netzap/ui/components/utilities/skeleton-list'

interface InstancesListSkeletonProps {
  amount?: number
}

export function InstancesListSkeleton({ amount }: InstancesListSkeletonProps) {
  return (
    <SkeletonList
      amount={amount}
      render={(_, i) => <Skeleton className="size-8 rounded-md" key={i} />}
    />
  )
}
