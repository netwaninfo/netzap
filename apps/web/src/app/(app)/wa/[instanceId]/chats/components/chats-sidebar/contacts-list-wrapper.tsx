import { PropsWithChildren } from 'react'

interface ContactsListWrapperProps extends PropsWithChildren {}

export function ContactsListWrapper({ ...props }: ContactsListWrapperProps) {
  return <div className="space-y-1 pb-6 pr-4" {...props} />
}
