import React from 'react'

import { cn } from '@netzap/ui/lib/utils'

const Sidebar = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <aside
    ref={ref}
    className={cn('min-w-12 flex flex-col border-r', className)}
    {...props}
  />
))
Sidebar.displayName = 'Sidebar'

const SidebarHeader = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <header ref={ref} className={cn('flex p-2', className)} {...props} />
))
SidebarHeader.displayName = 'SidebarHeader'

const SidebarFooter = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <footer ref={ref} className={cn('flex p-2', className)} {...props} />
))
SidebarFooter.displayName = 'SidebarFooter'

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex w-full min-w-0 flex-col space-y-2', className)}
    {...props}
  />
))
SidebarMenu.displayName = 'SidebarMenu'

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('flex justify-center', className)} {...props} />
))
SidebarMenuItem.displayName = 'SidebarMenuItem'

const SidebarContent = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <section ref={ref} className={cn('flex-1', className)} {...props} />
))
SidebarContent.displayName = 'SidebarContent'

export {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
}
