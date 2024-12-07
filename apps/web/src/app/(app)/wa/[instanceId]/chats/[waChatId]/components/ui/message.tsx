import {
  Paragraph,
  ParagraphProps,
  ParagraphRef,
  Small,
  SmallProps,
  SmallRef,
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

type MessageBoxRef = HTMLDivElement
type MessageBoxProps = React.HTMLAttributes<HTMLDivElement>

const MessageBox = React.forwardRef<MessageBoxRef, MessageBoxProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-md px-3 pt-2 pb-2.5 max-w-[70%] relative',
        className
      )}
      {...props}
    />
  )
)
MessageBox.displayName = 'MessageBox'

type MessageContentRef = HTMLDivElement
type MessageContentProps = React.HTMLAttributes<HTMLDivElement>

const MessageContent = React.forwardRef<MessageContentRef, MessageContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-1', className)} {...props} />
  )
)
MessageContent.displayName = 'MessageContent'

const MessageHeader = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <header ref={ref} className={cn('', className)} {...props} />
))
MessageHeader.displayName = 'MessageHeader'

const MessageAuthor = React.forwardRef<SmallRef, SmallProps>(
  ({ className, ...props }, ref) => (
    <Small ref={ref} className={cn('', className)} {...props} />
  )
)
MessageAuthor.displayName = 'MessageAuthor'

const MessageFooter = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <footer
    ref={ref}
    className={cn(
      'flex items-center space-x-1 justify-end absolute right-2 bottom-2',
      className
    )}
    {...props}
  />
))
MessageFooter.displayName = 'MessageFooter'

const MessageBody = React.forwardRef<ParagraphRef, ParagraphProps>(
  ({ className, ...props }, ref) => (
    <Paragraph
      ref={ref}
      className={cn('text-sm break-words whitespace-pre-wrap', className)}
      {...props}
    />
  )
)
MessageBody.displayName = 'MessageBody'

const MessageBodySpacer = React.forwardRef<ParagraphRef, ParagraphProps>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={cn('inline-block w-14', className)} {...props} />
  )
)
MessageBodySpacer.displayName = 'MessageBodySpacer'

type MessageDateRef = HTMLTimeElement
type MessageDateProps = React.TimeHTMLAttributes<HTMLTimeElement>

const MessageDate = React.forwardRef<MessageDateRef, MessageDateProps>(
  ({ className, ...props }, ref) => (
    <time ref={ref} className={cn('text-xs', className)} {...props} />
  )
)
MessageDate.displayName = 'MessageDate'

const MessageRow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center space-x-1', className)}
    {...props}
  />
))
MessageRow.displayName = 'MessageRow'

export {
  Message,
  type MessageRef,
  type MessageProps,
  MessageBox,
  type MessageBoxRef,
  type MessageBoxProps,
  MessageContent,
  type MessageContentRef,
  type MessageContentProps,
  MessageHeader,
  MessageAuthor,
  MessageFooter,
  MessageBody,
  MessageBodySpacer,
  MessageDate,
  type MessageDateRef,
  type MessageDateProps,
  MessageRow,
}
