import { env } from '@/env'
import wretch from 'wretch'

import { injectNextHeadersMiddleware } from './middlewares/inject-next-headers-middleware'

export const api = wretch(env.NEXT_PUBLIC_NETZAP_API_URL)
  .options({
    credentials: 'include',
    mode: 'cors',
  })
  .middlewares([injectNextHeadersMiddleware()])
