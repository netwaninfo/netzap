import { SkeletonList } from '@/components/custom/skeleton-list'
import { Skeleton } from '@/components/ui/skeleton'

export function ContactsListSkeleton() {
  return (
    <SkeletonList
      amount={20}
      render={() => <Skeleton className="w-full h-16 rounded-lg" />}
    />
  )
}
