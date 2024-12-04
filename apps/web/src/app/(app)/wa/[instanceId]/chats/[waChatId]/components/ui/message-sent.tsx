import { cn } from '@/lib/utils'
import React from 'react'

import {
  Message,
  MessageContent,
  MessageContentProps,
  MessageContentRef,
  MessageDate,
  MessageDateProps,
  MessageDateRef,
  MessageProps,
  MessageRef,
} from './message'

const MessageSent = React.forwardRef<MessageRef, MessageProps>(
  ({ className, ...props }, ref) => (
    <Message ref={ref} className={cn('justify-end', className)} {...props} />
  )
)
MessageSent.displayName = 'MessageSent'

const MessageSentContent = React.forwardRef<
  MessageContentRef,
  MessageContentProps
>(({ className, ...props }, ref) => (
  <MessageContent
    ref={ref}
    className={cn('bg-primary text-primary-foreground', className)}
    {...props}
  />
))
MessageSentContent.displayName = 'MessageSentContent'

const MessageSentDate = React.forwardRef<MessageDateRef, MessageDateProps>(
  ({ className, ...props }, ref) => (
    <MessageDate
      ref={ref}
      className={cn('text-primary-foreground/80', className)}
      {...props}
    />
  )
)
MessageSentDate.displayName = 'MessageSentDate'

export { MessageSent, MessageSentContent, MessageSentDate }
