import React from 'react'

import { cn } from '@netzap/ui/lib/utils'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  type AvatarProps,
  type AvatarRef,
} from '@netzap/ui/components/avatar'

import {
  H4,
  type H4Props,
  type H4Ref,
  Muted,
  type MutedProps,
  type MutedRef,
} from '@netzap/ui/components/typography'

const Contact = React.forwardRef<
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
Contact.displayName = 'Contact'

const ContactAvatar = React.forwardRef<AvatarRef, AvatarProps>(
  ({ className, ...props }, ref) => (
    <Avatar
      ref={ref}
      className={cn('size-12 rounded-full', className)}
      {...props}
    />
  )
)
ContactAvatar.displayName = 'ContactAvatar'

const ContactAvatarImage = AvatarImage
ContactAvatarImage.displayName = AvatarImage.displayName

const ContactAvatarFallback = AvatarFallback
ContactAvatarFallback.displayName = AvatarFallback.displayName

const ContactContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('min-w-0 text-left', className)} {...props} />
))
ContactContent.displayName = 'ContactContent'

const ContactName = React.forwardRef<H4Ref, H4Props>(
  ({ className, ...props }, ref) => (
    <H4
      ref={ref}
      className={cn('text-base truncate font-normal', className)}
      {...props}
    />
  )
)
ContactName.displayName = 'ContactName'

const ContactPhone = React.forwardRef<MutedRef, MutedProps>(
  ({ className, ...props }, ref) => (
    <Muted ref={ref} className={cn('', className)} {...props} />
  )
)
ContactPhone.displayName = 'ContactPhone'

export {
  Contact,
  ContactAvatar,
  ContactAvatarImage,
  ContactAvatarFallback,
  ContactContent,
  ContactName,
  ContactPhone,
}
