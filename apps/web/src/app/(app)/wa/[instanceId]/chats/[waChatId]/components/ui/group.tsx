import { badgeVariants } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import React from 'react'

const Group = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1', className)}
    {...props}
  />
))
Group.displayName = 'Group'

const GroupHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex justify-center', className)} {...props} />
))
GroupHeader.displayName = 'GroupHeader'

const GroupDate = React.forwardRef<
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
GroupDate.displayName = 'GroupDate'

const GroupContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col', className)} {...props} />
))
GroupContent.displayName = 'GroupContent'

export { Group, GroupHeader, GroupDate, GroupContent }
