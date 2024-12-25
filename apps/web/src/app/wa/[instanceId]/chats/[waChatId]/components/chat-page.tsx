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

const ChatPage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col w-full h-full', className)}
    {...props}
  />
))
ChatPage.displayName = 'ChatPage'

const ChatPageHeader = React.forwardRef<
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
ChatPageHeader.displayName = 'ChatPageHeader'

const ChatPageAvatar = React.forwardRef<AvatarRef, AvatarProps>(
  ({ className, ...props }, ref) => (
    <Avatar
      ref={ref}
      className={cn('size-10 rounded-full', className)}
      {...props}
    />
  )
)
ChatPageAvatar.displayName = 'ChatPageAvatar'

const ChatPageAvatarImage = AvatarImage
ChatPageAvatarImage.displayName = AvatarImage.displayName

const ChatPageAvatarFallback = AvatarFallback
ChatPageAvatarFallback.displayName = AvatarFallback.displayName

const ChatPageHeaderGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props} />
))
ChatPageHeaderGroup.displayName = 'ChatPageHeaderGroup'

const ChatPageTitle = React.forwardRef<H4Ref, H4Props>(
  ({ className, ...props }, ref) => (
    <H4
      ref={ref}
      className={cn('font-medium text-base leading-relaxed', className)}
      {...props}
    />
  )
)
ChatPageTitle.displayName = 'ChatPageTitle'

const ChatPagePhone = React.forwardRef<MutedRef, MutedProps>(
  ({ className, ...props }, ref) => (
    <Muted ref={ref} className={cn('leading-tight', className)} {...props} />
  )
)
ChatPagePhone.displayName = 'ChatPagePhone'

const ChatPageContent = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <section ref={ref} className={cn('min-h-0 flex-1', className)} {...props} />
))
ChatPageContent.displayName = 'ChatPageContent'

const ChatPageContentWrapper = React.forwardRef<
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
ChatPageContentWrapper.displayName = 'ChatPageContentWrapper'

const ChatPageFooter = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <footer ref={ref} className={cn('border-t p-4', className)} {...props} />
))
ChatPageFooter.displayName = 'ChatPageFooter'

export {
  ChatPage,
  ChatPageHeader,
  ChatPageAvatar,
  ChatPageAvatarImage,
  ChatPageAvatarFallback,
  ChatPageHeaderGroup,
  ChatPageTitle,
  ChatPagePhone,
  ChatPageContent,
  ChatPageContentWrapper,
  ChatPageFooter,
}
