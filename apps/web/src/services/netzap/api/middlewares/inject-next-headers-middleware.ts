import { isSSR } from '@/utils/is-ssr'
import type { ConfiguredMiddleware, WretchOptions } from 'wretch'

export function injectNextHeadersMiddleware(): ConfiguredMiddleware {
  return next => {
    return async (url: string, opts: WretchOptions) => {
      if (isSSR()) {
        const { headers } = await import('next/headers')

        const options: WretchOptions = Object.assign({}, opts, {
          headers: await headers(),
        })

        return next(url, options)
      }

      return next(url, opts)
    }
  }
}
