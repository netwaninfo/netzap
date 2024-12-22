import { cn } from '@/lib/utils'
import React from 'react'

import {
  Message,
  MessageBox,
  type MessageBoxProps,
  type MessageBoxRef,
  MessageDate,
  type MessageDateProps,
  type MessageDateRef,
  MessageMediaBox,
  type MessageMediaBoxProps,
  type MessageMediaBoxRef,
  type MessageProps,
  type MessageRef,
  MessageShape,
  type MessageShapeProps,
  type MessageShapeRef,
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

const MessageSentMediaBox = React.forwardRef<
  MessageMediaBoxRef,
  MessageMediaBoxProps
>(({ className, ...props }, ref) => (
  <MessageMediaBox
    ref={ref}
    className={cn('bg-primary text-primary-foreground', className)}
    {...props}
  />
))
MessageSentMediaBox.displayName = 'MessageSentMediaBox'

const MessageSentShape = React.forwardRef<MessageShapeRef, MessageShapeProps>(
  ({ className, ...props }, ref) => (
    <MessageShape
      ref={ref}
      className={cn('bg-secondary/10', className)}
      {...props}
    />
  )
)
MessageSentShape.displayName = 'MessageSentShape'

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

export {
  MessageSent,
  MessageSentBox,
  MessageSentMediaBox,
  MessageSentShape,
  MessageSentDate,
}
