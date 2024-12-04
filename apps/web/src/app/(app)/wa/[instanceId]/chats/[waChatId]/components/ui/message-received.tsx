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

const MessageReceived = React.forwardRef<MessageRef, MessageProps>(
  ({ className, ...props }, ref) => (
    <Message ref={ref} className={cn(className)} {...props} />
  )
)
MessageReceived.displayName = 'MessageReceived'

const MessageReceivedContent = React.forwardRef<
  MessageContentRef,
  MessageContentProps
>(({ className, ...props }, ref) => (
  <MessageContent
    ref={ref}
    className={cn('bg-muted text-muted-foreground', className)}
    {...props}
  />
))
MessageReceivedContent.displayName = 'MessageReceivedContent'

const MessageReceivedDate = React.forwardRef<MessageDateRef, MessageDateProps>(
  ({ className, ...props }, ref) => (
    <MessageDate
      ref={ref}
      className={cn('text-muted-foreground', className)}
      {...props}
    />
  )
)
MessageReceivedDate.displayName = 'MessageReceivedDate'

export { MessageReceived, MessageReceivedContent, MessageReceivedDate }
