import { Check, CheckCheck, Clock2 } from 'lucide-react'

import {
  Paragraph,
  ParagraphProps,
  ParagraphRef,
} from '@/components/custom/typography'
import { cn } from '@/lib/utils'
import React from 'react'

const Message = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex min-w-0 items-center space-x-0.5', className)}
    {...props}
  />
))
Message.displayName = 'Message'

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
Message.displayName = 'Message'

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
    <CheckCheck className="size-4 text-blue-500" />
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

const MessageStatusDefault = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <MessageStatus ref={ref} className={cn('', className)} {...props}>
    <Check className="size-4" />
  </MessageStatus>
))
MessageStatusDefault.displayName = 'MessageStatusDefault'

const MessageContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex min-w-0 items-center space-x-1', className)}
    {...props}
  />
))
MessageContent.displayName = 'MessageContent'

const MessageContentGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex min-w-0 items-center space-x-1', className)}
    {...props}
  />
))
MessageContentGroup.displayName = 'MessageContentGroup'

const MessageAuthor = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-sm', className)} {...props} />
))
MessageAuthor.displayName = 'MessageAuthor'

const MessageIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('size-4', className)} {...props} />
))
MessageIcon.displayName = 'MessageIcon'

const MessageBody = React.forwardRef<ParagraphRef, ParagraphProps>(
  ({ className, ...props }, ref) => (
    <Paragraph
      ref={ref}
      className={cn('truncate text-sm', className)}
      {...props}
    />
  )
)
MessageBody.displayName = 'MessageBody'

export {
  Message,
  MessageStatusSent,
  MessageStatusDefault,
  MessageStatusPending,
  MessageStatusRead,
  MessageContent,
  MessageContentGroup,
  MessageAuthor,
  MessageIcon,
  MessageBody,
}
