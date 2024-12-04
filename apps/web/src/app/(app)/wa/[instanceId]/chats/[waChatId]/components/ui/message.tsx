import {
  Paragraph,
  ParagraphProps,
  ParagraphRef,
} from '@/components/custom/typography'
import { cn } from '@/lib/utils'
import React from 'react'

type MessageRef = HTMLDivElement
type MessageProps = React.HTMLAttributes<HTMLDivElement>

const Message = React.forwardRef<MessageRef, MessageProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex', className)} {...props} />
  )
)
Message.displayName = 'Message'

type MessageContentRef = HTMLDivElement
type MessageContentProps = React.HTMLAttributes<HTMLDivElement>

const MessageContent = React.forwardRef<MessageContentRef, MessageContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('rounded-md p-3 max-w-[70%] space-y-1', className)}
      {...props}
    />
  )
)
MessageContent.displayName = 'MessageContent'

const MessageBody = React.forwardRef<ParagraphRef, ParagraphProps>(
  ({ className, ...props }, ref) => (
    <Paragraph ref={ref} className={cn('text-sm', className)} {...props} />
  )
)
MessageBody.displayName = 'MessageBody'

type MessageDateRef = HTMLTimeElement
type MessageDateProps = React.TimeHTMLAttributes<HTMLTimeElement>

const MessageDate = React.forwardRef<MessageDateRef, MessageDateProps>(
  ({ className, ...props }, ref) => (
    <time
      ref={ref}
      className={cn('text-xs float-right', className)}
      {...props}
    />
  )
)
MessageDate.displayName = 'MessageDate'

export {
  Message,
  type MessageRef,
  type MessageProps,
  MessageContent,
  type MessageContentRef,
  type MessageContentProps,
  MessageBody,
  MessageDate,
  type MessageDateRef,
  type MessageDateProps,
}
