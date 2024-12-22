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

const MessageContact = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('w-full flex items-center space-x-4', className)}
    {...props}
  />
))
MessageContact.displayName = 'MessageContact'

const MessageContactAvatar = React.forwardRef<AvatarRef, AvatarProps>(
  ({ className, ...props }, ref) => (
    <Avatar ref={ref} className={cn('', className)} {...props} />
  )
)
MessageContactAvatar.displayName = 'MessageContactAvatar'

const MessageContactAvatarImage = AvatarImage
MessageContactAvatarImage.displayName = AvatarImage.displayName

const MessageContactAvatarFallback = AvatarFallback
MessageContactAvatarFallback.displayName = AvatarFallback.displayName

const MessageContactContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('min-w-0 text-left', className)} {...props} />
))
MessageContactContent.displayName = 'MessageContactContent'

const MessageContactName = React.forwardRef<H4Ref, H4Props>(
  ({ className, ...props }, ref) => (
    <H4
      ref={ref}
      className={cn('text-base truncate font-normal', className)}
      {...props}
    />
  )
)
MessageContactName.displayName = 'MessageContactName'

const MessageContactPhone = React.forwardRef<MutedRef, MutedProps>(
  ({ className, ...props }, ref) => (
    <Muted ref={ref} className={cn('', className)} {...props} />
  )
)
MessageContactPhone.displayName = 'MessageContactPhone'

export {
  MessageContact,
  MessageContactAvatar,
  MessageContactAvatarImage,
  MessageContactAvatarFallback,
  MessageContactContent,
  MessageContactName,
  MessageContactPhone,
}
