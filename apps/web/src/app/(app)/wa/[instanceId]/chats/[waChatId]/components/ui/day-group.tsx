import { badgeVariants } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import React from 'react'

const DayGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1', className)}
    {...props}
  />
))
DayGroup.displayName = 'DayGroup'

const DayGroupHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex justify-center', className)} {...props} />
))
DayGroupHeader.displayName = 'DayGroupHeader'

const DayGroupDate = React.forwardRef<
  HTMLTimeElement,
  React.TimeHTMLAttributes<HTMLTimeElement>
>(({ className, ...props }, ref) => (
  <time
    ref={ref}
    className={cn(
      badgeVariants({ variant: 'default' }),
      'rounded-sm py-1',
      className
    )}
    {...props}
  />
))
DayGroupDate.displayName = 'DayGroupDate'

const DayGroupContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-0.5', className)}
    {...props}
  />
))
DayGroupContent.displayName = 'DayGroupContent'

export { DayGroup, DayGroupHeader, DayGroupDate, DayGroupContent }
