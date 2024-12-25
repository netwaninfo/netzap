import { SkeletonList } from '@netzap/ui/components/utilities/skeleton-list'

import { ContactItemSkeleton } from './contact-item-skeleton'

interface ContactsListSkeletonProps {
  amount: number
}

export function ContactsListSkeleton({ amount }: ContactsListSkeletonProps) {
  return (
    <SkeletonList
      amount={amount}
      render={(_, i) => <ContactItemSkeleton key={i} />}
    />
  )
}
