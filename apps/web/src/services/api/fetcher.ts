import { env } from '@/env'
import wretch from 'wretch'
import QueryStringAddon from 'wretch/addons/queryString'
import { retry } from 'wretch/middlewares'
import { injectNextHeadersMiddleware } from './middlewares/inject-next-headers-middleware'

export const fetcher = wretch(env.NEXT_PUBLIC_NETZAP_API_URL)
  .options({
    credentials: 'include',
    mode: 'cors',
  })
  .middlewares([injectNextHeadersMiddleware(), retry({ maxAttempts: 2 })])
  .addon(QueryStringAddon)

export type Fetcher = typeof fetcher
