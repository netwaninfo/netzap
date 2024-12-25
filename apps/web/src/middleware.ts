import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/auth/sign-in(.*)'])

const isRouteToRedirectWhenAuthenticated = createRouteMatcher([
  '/',
  '/auth/sign-in(.*)',
])

export default clerkMiddleware(async (auth, request) => {
  const { userId, redirectToSignIn, getToken } = await auth()

  if (!userId && !isPublicRoute(request)) {
    return redirectToSignIn()
  }

  if (userId && isRouteToRedirectWhenAuthenticated(request)) {
    const token = await getToken()
    if (!token) {
      return NextResponse.redirect(new URL('/auth/sign-out', request.url))
    }

    return NextResponse.redirect(new URL('/wa', request.url))
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
