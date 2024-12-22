import {
  H4,
  type H4Props,
  type H4Ref,
  Muted,
  type MutedProps,
  type MutedRef,
} from '@/components/custom/typography'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  type AvatarProps,
  type AvatarRef,
} from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import React from 'react'

const Chat = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col w-full h-full', className)}
    {...props}
  />
))
Chat.displayName = 'Chat'

const ChatHeader = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <header
    ref={ref}
    className={cn(
      'px-4 py-2.5 border-b space-x-4 h-16 flex items-center',
      className
    )}
    {...props}
  />
))
ChatHeader.displayName = 'ChatHeader'

const ChatAvatar = React.forwardRef<AvatarRef, AvatarProps>(
  ({ className, ...props }, ref) => (
    <Avatar
      ref={ref}
      className={cn('size-10 rounded-full', className)}
      {...props}
    />
  )
)
ChatAvatar.displayName = 'ChatAvatar'

const ChatAvatarImage = AvatarImage
ChatAvatarImage.displayName = AvatarImage.displayName

const ChatAvatarFallback = AvatarFallback
ChatAvatarFallback.displayName = AvatarFallback.displayName

const ChatHeaderGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props} />
))
ChatHeaderGroup.displayName = 'ChatHeaderGroup'

const ChatTitle = React.forwardRef<H4Ref, H4Props>(
  ({ className, ...props }, ref) => (
    <H4
      ref={ref}
      className={cn('font-medium text-base leading-relaxed', className)}
      {...props}
    />
  )
)
ChatTitle.displayName = 'ChatTitle'

const ChatPhone = React.forwardRef<MutedRef, MutedProps>(
  ({ className, ...props }, ref) => (
    <Muted ref={ref} className={cn('leading-tight', className)} {...props} />
  )
)
ChatPhone.displayName = 'ChatPhone'

const ChatContent = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <section ref={ref} className={cn('min-h-0 flex-1', className)} {...props} />
))
ChatContent.displayName = 'ChatContent'

const ChatContentWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'p-4 space-y-3 min-w-96 max-w-screen-lg mx-auto w-full h-full',
      className
    )}
    {...props}
  />
))
ChatContentWrapper.displayName = 'ChatContentWrapper'

const ChatFooter = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <footer ref={ref} className={cn('border-t p-4', className)} {...props} />
))
ChatFooter.displayName = 'ChatFooter'

export {
  Chat,
  ChatHeader,
  ChatAvatar,
  ChatAvatarImage,
  ChatAvatarFallback,
  ChatHeaderGroup,
  ChatTitle,
  ChatPhone,
  ChatContent,
  ChatContentWrapper,
  ChatFooter,
}
