import { Check, CheckCheck, CircleX, Clock2 } from 'lucide-react'
import React from 'react'

import { cn } from '@/lib/utils'

const MessageStatus = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn('flex items-center justify-center', className)}
    ref={ref}
    {...props}
  />
))
MessageStatus.displayName = 'MessageStatus'

const MessageStatusSent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <MessageStatus ref={ref} className={cn('', className)} {...props}>
    <CheckCheck className="size-4" />
  </MessageStatus>
))
MessageStatusSent.displayName = 'MessageStatusSent'

const MessageStatusRead = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <MessageStatus ref={ref} className={cn('', className)} {...props}>
    <CheckCheck className="size-4 text-blue-700" />
  </MessageStatus>
))
MessageStatusRead.displayName = 'MessageStatusRead'

const MessageStatusPending = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <MessageStatus ref={ref} className={cn('', className)} {...props}>
    <Clock2 className="size-4" />
  </MessageStatus>
))
MessageStatusPending.displayName = 'MessageStatusPending'

const MessageStatusError = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <MessageStatus ref={ref} className={cn('', className)} {...props}>
    <CircleX className="size-4" />
  </MessageStatus>
))
MessageStatusError.displayName = 'MessageStatusError'

const MessageStatusDefault = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <MessageStatus ref={ref} className={cn('', className)} {...props}>
    <Check className="size-4" />
  </MessageStatus>
))
MessageStatusDefault.displayName = 'MessageStatusDefault'

export {
  MessageStatusSent,
  MessageStatusDefault,
  MessageStatusPending,
  MessageStatusRead,
  MessageStatusError,
}
