'use client'

import { useClerk } from '@clerk/nextjs'
import { useEffect } from 'react'

export function AutoSignOut() {
  const { signOut } = useClerk()

  useEffect(() => {
    signOut({ redirectUrl: '/auth/sign-in' })
  }, [signOut])

  return null
}
