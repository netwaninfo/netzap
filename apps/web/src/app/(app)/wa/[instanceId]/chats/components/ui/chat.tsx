import { H4, H4Props, H4Ref } from '@/components/custom/typography'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarProps,
  AvatarRef,
} from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import React from 'react'

const Chat = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'w-full flex py-2 px-4 hover:bg-border/40 items-center space-x-4 rounded-lg ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed select-none',
      className
    )}
    {...props}
  />
))
Chat.displayName = 'Chat'

const ChatAvatar = React.forwardRef<AvatarRef, AvatarProps>(
  ({ className, ...props }, ref) => (
    <Avatar
      ref={ref}
      className={cn('size-12 rounded-full', className)}
      {...props}
    />
  )
)
ChatAvatar.displayName = 'ChatAvatar'

const ChatAvatarImage = AvatarImage
ChatAvatarImage.displayName = AvatarImage.displayName

const ChatAvatarFallback = AvatarFallback
ChatAvatarFallback.displayName = AvatarFallback.displayName

const ChatContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex-1 min-w-0', className)} {...props} />
))
ChatContent.displayName = 'ChatContent'

const ChatContentGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center justify-between space-x-2', className)}
    {...props}
  />
))
ChatContentGroup.displayName = 'ChatContentGroup'

const ChatName = React.forwardRef<H4Ref, H4Props>(
  ({ className, ...props }, ref) => (
    <H4 ref={ref} className={cn('text-base truncate', className)} {...props} />
  )
)
ChatName.displayName = 'ChatName'

const ChatTime = React.forwardRef<
  HTMLTimeElement,
  React.TimeHTMLAttributes<HTMLTimeElement>
>(({ className, ...props }, ref) => (
  <time
    ref={ref}
    className={cn('text-xs text-muted-foreground', className)}
    {...props}
  />
))
ChatTime.displayName = 'ChatTime'

const ChatCounter = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLTimeElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      'aspect-square h-4 p-1 shrink-0 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center',
      className
    )}
    {...props}
  />
))
ChatCounter.displayName = 'ChatCounter'

export {
  Chat,
  ChatAvatar,
  ChatAvatarImage,
  ChatAvatarFallback,
  ChatContent,
  ChatContentGroup,
  ChatName,
  ChatTime,
  ChatCounter,
}
