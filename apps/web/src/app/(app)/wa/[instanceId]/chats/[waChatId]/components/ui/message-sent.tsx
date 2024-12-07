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

const MessageSent = React.forwardRef<MessageRef, MessageProps>(
  ({ className, ...props }, ref) => (
    <Message ref={ref} className={cn('justify-end', className)} {...props} />
  )
)
MessageSent.displayName = 'MessageSent'

const MessageSentBox = React.forwardRef<MessageBoxRef, MessageBoxProps>(
  ({ className, ...props }, ref) => (
    <MessageBox
      ref={ref}
      className={cn('bg-primary text-primary-foreground', className)}
      {...props}
    />
  )
)
MessageSentBox.displayName = 'MessageSentBox'

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

export { MessageSent, MessageSentBox, MessageSentDate }
