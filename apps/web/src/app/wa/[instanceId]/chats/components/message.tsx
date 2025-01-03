import React from 'react'

import { Check, CheckCheck, CircleX, Clock2 } from 'lucide-react'

import { cn } from '@netzap/ui/lib/utils'

import {
  Paragraph,
  type ParagraphProps,
  type ParagraphRef,
} from '@netzap/ui/components/typography'

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
  <div
    ref={ref}
    className={cn('text-sm whitespace-nowrap', className)}
    {...props}
  />
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
  MessageStatusError,
  MessageStatusRead,
  MessageContent,
  MessageContentGroup,
  MessageAuthor,
  MessageIcon,
  MessageBody,
}
