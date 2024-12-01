import { cn } from '@/lib/utils'
import React from 'react'

const InputGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center relative', className)}
    {...props}
  />
))
InputGroup.displayName = 'InputGroup'

const InputLeftAddon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('absolute left-3 inset-y-center', className)}
    {...props}
  />
))
InputLeftAddon.displayName = 'InputLeftAddon'

const InputRightAddon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('absolute right-4 inset-y-center', className)}
    {...props}
  />
))
InputRightAddon.displayName = 'InputRightAddon'

export { InputGroup, InputLeftAddon, InputRightAddon }
