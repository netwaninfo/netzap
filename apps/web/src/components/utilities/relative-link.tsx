'use client'

import { resolveHref } from 'next/dist/client/resolve-href'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { type NextRouter } from 'next/router'
import React, { useRef } from 'react'

type RelativeLinkRef = HTMLAnchorElement
type RelativeLinkProps = React.ComponentProps<typeof Link>

const RelativeLink = React.forwardRef<RelativeLinkRef, RelativeLinkProps>(
  ({ href, ...props }, ref) => {
    const router = useRouter()
    const pathname = usePathname()

    const enforcedPath = useRef(pathname).current

    const nestedPath = resolveHref(
      router as unknown as NextRouter,
      href
    ) as string

    const currentHref = enforcedPath.concat(nestedPath).replace('//', '/')

    return <Link href={currentHref} ref={ref} {...props} />
  }
)
RelativeLink.displayName = 'Chat'

export { RelativeLink, type RelativeLinkRef, type RelativeLinkProps }
