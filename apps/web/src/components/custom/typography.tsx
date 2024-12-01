import { cn } from '@/lib/utils'
import React from 'react'

type H1Ref = HTMLHeadingElement
type H1Props = React.HTMLAttributes<HTMLHeadingElement>

const H1 = React.forwardRef<H1Ref, H1Props>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn(
      'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      className
    )}
    {...props}
  />
))
H1.displayName = 'H1'

type H2Ref = HTMLHeadingElement
type H2Props = React.HTMLAttributes<HTMLHeadingElement>

const H2 = React.forwardRef<H2Ref, H2Props>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      className
    )}
    {...props}
  />
))
H2.displayName = 'H2'

type H3Ref = HTMLHeadingElement
type H3Props = React.HTMLAttributes<HTMLHeadingElement>

const H3 = React.forwardRef<H3Ref, H3Props>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'scroll-m-20 text-2xl font-semibold tracking-tight',
      className
    )}
    {...props}
  />
))
H3.displayName = 'H3'

type H4Ref = HTMLHeadingElement
type H4Props = React.HTMLAttributes<HTMLHeadingElement>

const H4 = React.forwardRef<H4Ref, H4Props>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn(
      'scroll-m-20 text-xl font-semibold tracking-tight',
      className
    )}
    {...props}
  />
))
H4.displayName = 'H4'

type ParagraphRef = HTMLParagraphElement
type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement>

const Paragraph = React.forwardRef<ParagraphRef, ParagraphProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('leading-relaxed', className)} {...props} />
  )
)
Paragraph.displayName = 'Paragraph'

type LargeRef = HTMLDivElement
type LargeProps = React.HTMLAttributes<HTMLDivElement>

const Large = React.forwardRef<LargeRef, LargeProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-lg font-semibold', className)}
      {...props}
    />
  )
)
Large.displayName = 'Large'

type SmallRef = HTMLElement
type SmallProps = React.HTMLAttributes<HTMLElement>

const Small = React.forwardRef<SmallRef, SmallProps>(
  ({ className, ...props }, ref) => (
    <small
      ref={ref}
      className={cn('text-sm font-medium leading-none', className)}
      {...props}
    />
  )
)
Small.displayName = 'Small'

type MutedRef = HTMLParagraphElement
type MutedProps = React.HTMLAttributes<HTMLParagraphElement>

const Muted = React.forwardRef<MutedRef, MutedProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
)
Muted.displayName = 'Muted'

type CodeRef = HTMLElement
type CodeProps = React.HTMLAttributes<HTMLElement>

const Code = React.forwardRef<CodeRef, CodeProps>(
  ({ className, ...props }, ref) => (
    <code
      ref={ref}
      className={cn(
        'text-sm inline-block border rounded-sm py-px px-1',
        className
      )}
      {...props}
    />
  )
)
Code.displayName = 'Code'

type InlineRef = HTMLElement
type InlineProps = React.HTMLAttributes<HTMLElement>

const Inline = React.forwardRef<InlineRef, InlineProps>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={cn('leading-4', className)} {...props} />
  )
)
Code.displayName = 'Code'

export {
  H1,
  type H1Ref,
  type H1Props,
  H2,
  type H2Ref,
  type H2Props,
  H3,
  type H3Ref,
  type H3Props,
  H4,
  type H4Ref,
  type H4Props,
  Paragraph,
  type ParagraphRef,
  type ParagraphProps,
  Large,
  type LargeRef,
  type LargeProps,
  Small,
  type SmallRef,
  type SmallProps,
  Muted,
  type MutedRef,
  type MutedProps,
  Code,
  type CodeRef,
  type CodeProps,
  Inline,
  type InlineRef,
  type InlineProps,
}
