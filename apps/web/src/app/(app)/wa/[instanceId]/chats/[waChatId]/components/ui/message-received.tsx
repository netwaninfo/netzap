import { cn } from '@/lib/utils'
import React from 'react'

import {
  Message,
  MessageBox,
  MessageBoxProps,
  MessageBoxRef,
  MessageDate,
  MessageDateProps,
  MessageDateRef,
  MessageProps,
  MessageRef,
} from './message'

const MessageReceived = React.forwardRef<MessageRef, MessageProps>(
  ({ className, ...props }, ref) => (
    <Message ref={ref} className={cn('', className)} {...props} />
  )
)
MessageReceived.displayName = 'MessageReceived'

const MessageReceivedBox = React.forwardRef<MessageBoxRef, MessageBoxProps>(
  ({ className, ...props }, ref) => (
    <MessageBox
      ref={ref}
      className={cn('bg-muted text-muted-foreground', className)}
      {...props}
    />
  )
)
MessageReceivedBox.displayName = 'MessageReceivedBox'

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

export { MessageReceived, MessageReceivedBox, MessageReceivedDate }
