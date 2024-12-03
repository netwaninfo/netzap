import { useParsedParams } from '@/hooks/use-parsed-params'
import { z } from 'zod'

const instanceParamsSchema = z.object({ instanceId: z.string() })

function useInstanceParams() {
  const params = useParsedParams(instanceParamsSchema)

  return params
}

export { useInstanceParams, instanceParamsSchema }
