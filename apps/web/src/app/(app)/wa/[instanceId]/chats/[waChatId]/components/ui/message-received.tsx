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

const MessageReceived = React.forwardRef<MessageRef, MessageProps>(
  ({ className, ...props }, ref) => (
    <Message ref={ref} className={cn('', className)} {...props} />
  )
)
MessageReceived.displayName = 'MessageReceived'

type MessageReceivedBoxRef = MessageBoxRef
type MessageReceivedBoxProps = MessageBoxProps

const MessageReceivedBox = React.forwardRef<
  MessageReceivedBoxRef,
  MessageReceivedBoxProps
>(({ className, ...props }, ref) => (
  <MessageBox
    ref={ref}
    className={cn('bg-muted text-muted-foreground', className)}
    {...props}
  />
))
MessageReceivedBox.displayName = 'MessageReceivedBox'

const MessageReceivedMediaBox = React.forwardRef<
  MessageMediaBoxRef,
  MessageMediaBoxProps
>(({ className, ...props }, ref) => (
  <MessageMediaBox
    ref={ref}
    className={cn('bg-muted text-muted-foreground', className)}
    {...props}
  />
))
MessageReceivedMediaBox.displayName = 'MessageReceivedMediaBox'

const MessageReceivedShape = React.forwardRef<
  MessageShapeRef,
  MessageShapeProps
>(({ className, ...props }, ref) => (
  <MessageShape
    ref={ref}
    className={cn('bg-primary/5', className)}
    {...props}
  />
))
MessageReceivedShape.displayName = 'MessageReceivedShape'

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

export {
  MessageReceived,
  MessageReceivedBox,
  MessageReceivedMediaBox,
  MessageReceivedShape,
  MessageReceivedDate,
}
