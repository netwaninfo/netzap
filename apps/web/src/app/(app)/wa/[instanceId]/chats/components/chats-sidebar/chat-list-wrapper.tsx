import { PropsWithChildren } from 'react'

interface ChatListWrapperProps extends PropsWithChildren {}

export function ChatListWrapper({ ...props }: ChatListWrapperProps) {
  return <div className="space-y-1 py-2 px-3" {...props} />
}
