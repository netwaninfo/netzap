'use client'

import * as AvatarPrimitive from '@radix-ui/react-avatar'
import * as React from 'react'

import { cn } from '@netzap/ui/lib/utils'
import { useInitials } from '../hooks/use-initials'

type AvatarRef = React.ElementRef<typeof AvatarPrimitive.Root>
type AvatarProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>

const Avatar = React.forwardRef<AvatarRef, AvatarProps>(
  ({ className, ...props }, ref) => (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
        className
      )}
      {...props}
    />
  )
)
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

type AvatarFallbackRef = React.ElementRef<typeof AvatarPrimitive.Fallback>
type AvatarFallbackProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Fallback
>

const AvatarFallback = React.forwardRef<AvatarFallbackRef, AvatarFallbackProps>(
  ({ className, ...props }, ref) => (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-muted',
        className
      )}
      {...props}
    />
  )
)
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

type AvatarInitialsRef = AvatarFallbackRef
interface AvatarInitialsProps extends AvatarFallbackProps {
  children: string
}

const AvatarInitials = React.forwardRef<AvatarInitialsRef, AvatarInitialsProps>(
  ({ children, ...props }, ref) => {
    const initials = useInitials({ value: children })

    return (
      <AvatarFallback ref={ref} {...props}>
        {initials}
      </AvatarFallback>
    )
  }
)
AvatarInitials.displayName = AvatarFallback.displayName

export {
  Avatar,
  type AvatarRef,
  type AvatarProps,
  AvatarImage,
  AvatarFallback,
  AvatarInitials,
}
