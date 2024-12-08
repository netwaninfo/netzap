import { SkeletonList } from '@/components/custom/skeleton-list'
import { ContactItemSkeleton } from './contact-item-skeleton'
import { ContactsListWrapper } from './contacts-list-wrapper'

interface ContactsListSkeletonProps {
  amount: number
}

export function ContactsListSkeleton({ amount }: ContactsListSkeletonProps) {
  return (
    <ContactsListWrapper>
      <SkeletonList amount={amount} render={() => <ContactItemSkeleton />} />
    </ContactsListWrapper>
  )
}
