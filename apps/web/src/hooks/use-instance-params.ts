import { z } from 'zod'
import { useParsedParams } from './use-parsed-params'

const paramsSchema = z.object({ instanceId: z.string() })

export function useInstanceParams() {
  const params = useParsedParams(paramsSchema)

  return params
}
