import { z } from 'zod'
import { useParsedParams } from './use-parsed-params'

const instanceParamsSchema = z.object({ instanceId: z.string() })

function useInstanceParams() {
  const params = useParsedParams(instanceParamsSchema)

  return params
}

export { useInstanceParams, instanceParamsSchema }
