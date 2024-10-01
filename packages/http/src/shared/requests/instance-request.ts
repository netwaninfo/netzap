import { z } from 'zod'

export const instanceRequestParamsSchema = z.object({
  instanceId: z.string(),
})

export type InstanceRequestParams = z.infer<typeof instanceRequestParamsSchema>
