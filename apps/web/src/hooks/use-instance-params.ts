import { z } from 'zod'

import { useParsedParams } from '@netzap/ui/hooks/use-parsed-params'

const instanceParamsSchema = z.object({ instanceId: z.string() })

function useInstanceParams() {
  return useParsedParams(instanceParamsSchema)
}

export { useInstanceParams, instanceParamsSchema }
