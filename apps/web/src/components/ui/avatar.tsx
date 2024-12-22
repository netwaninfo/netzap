'use client'

import * as AvatarPrimitive from '@radix-ui/react-avatar'
import * as React from 'react'
import type { OverrideProperties } from 'type-fest'

import { cn } from '@/lib/utils'
import { getInitials } from '@/utils/get-initials'

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

type AvatarImageRef = React.ElementRef<typeof AvatarPrimitive.Image>
type AvatarImageProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Image
>

const AvatarImage = React.forwardRef<AvatarImageRef, AvatarImageProps>(
  ({ className, ...props }, ref) => (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn('aspect-square h-full w-full', className)}
      {...props}
    />
  )
)
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

type AvatarNameRef = AvatarFallbackRef
type AvatarNameProps = OverrideProperties<
  AvatarFallbackProps,
  { children?: string }
>

const AvatarName = React.forwardRef<AvatarNameRef, AvatarNameProps>(
  ({ children, ...props }, ref) => {
    const name = getInitials({ value: children ?? '' })

    return (
      <AvatarFallback ref={ref} {...props}>
        {name}
      </AvatarFallback>
    )
  }
)
AvatarName.displayName = 'AvatarName'

export {
  Avatar,
  type AvatarRef,
  type AvatarProps,
  AvatarImage,
  type AvatarImageRef,
  type AvatarImageProps,
  AvatarFallback,
  type AvatarFallbackRef,
  type AvatarFallbackProps,
  AvatarName,
  type AvatarNameRef,
  type AvatarNameProps,
}
