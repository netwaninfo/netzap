import React from 'react'

import { cn } from '@netzap/ui/lib/utils'

import {
  Paragraph,
  type ParagraphProps,
  type ParagraphRef,
  Small,
  type SmallProps,
  type SmallRef,
} from '@netzap/ui/components/typography'

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
      className={cn('rounded-md p-3 max-w-[70%] relative', className)}
      {...props}
    />
  )
)
MessageBox.displayName = 'MessageBox'

type MessageMediaBoxRef = MessageBoxRef
type MessageMediaBoxProps = MessageBoxProps

const MessageMediaBox = React.forwardRef<
  MessageMediaBoxRef,
  MessageMediaBoxProps
>(({ className, ...props }, ref) => (
  <MessageBox
    ref={ref}
    className={cn('max-w-84 w-full', className)}
    {...props}
  />
))
MessageMediaBox.displayName = 'MessageMediaBox'

type MessageContentRef = HTMLDivElement
type MessageContentProps = React.HTMLAttributes<HTMLDivElement>

const MessageContent = React.forwardRef<MessageContentRef, MessageContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mb-1', className)} {...props} />
  )
)
MessageContent.displayName = 'MessageContent'

const MessageHeader = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <header ref={ref} className={cn('mb-0.5', className)} {...props} />
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
      'flex items-center space-x-1 justify-end absolute right-3 bottom-2',
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
    <span ref={ref} className={cn('inline-block w-16', className)} {...props} />
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

type MessageGroupRef = HTMLDivElement
type MessageGroupProps = React.HTMLAttributes<HTMLDivElement>

const MessageGroup = React.forwardRef<MessageGroupRef, MessageGroupProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center space-x-1', className)}
      {...props}
    />
  )
)
MessageGroup.displayName = 'MessageGroup'

type MessageShapeRef = MessageGroupRef
type MessageShapeProps = MessageGroupProps

const MessageShape = React.forwardRef<MessageShapeRef, MessageShapeProps>(
  ({ className, ...props }, ref) => (
    <MessageGroup
      ref={ref}
      className={cn('p-2 rounded-sm', className)}
      {...props}
    />
  )
)
MessageShape.displayName = 'MessageShape'

export {
  Message,
  type MessageRef,
  type MessageProps,
  MessageBox,
  type MessageBoxRef,
  type MessageBoxProps,
  MessageMediaBox,
  type MessageMediaBoxRef,
  type MessageMediaBoxProps,
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
  MessageGroup,
  MessageShape,
  type MessageShapeRef,
  type MessageShapeProps,
}
