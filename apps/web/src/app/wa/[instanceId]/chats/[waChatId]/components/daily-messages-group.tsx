import React from 'react'

import { badgeVariants } from '@netzap/ui/components/badge'
import { cn } from '@netzap/ui/lib/utils'

const DailyMessagesGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-2.5', className)}
    {...props}
  />
))
DailyMessagesGroup.displayName = 'DailyMessagesGroup'

const DailyMessagesGroupHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex justify-center sticky top-3 z-[1]', className)}
    {...props}
  />
))
DailyMessagesGroupHeader.displayName = 'DailyMessagesGroupHeader'

const DailyMessagesGroupDate = React.forwardRef<
  HTMLTimeElement,
  React.TimeHTMLAttributes<HTMLTimeElement>
>(({ className, ...props }, ref) => (
  <time
    ref={ref}
    className={cn(
      badgeVariants({ variant: 'secondary' }),
      'rounded-sm py-1 shadow',
      className
    )}
    {...props}
  />
))
DailyMessagesGroupDate.displayName = 'DailyMessagesGroupDate'

const DailyMessagesGroupContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1', className)}
    {...props}
  />
))
DailyMessagesGroupContent.displayName = 'DailyMessagesGroupContent'

export {
  DailyMessagesGroup,
  DailyMessagesGroupHeader,
  DailyMessagesGroupDate,
  DailyMessagesGroupContent,
}
