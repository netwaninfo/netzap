import z from 'zod'

export const instanceRequestParamsSchema = z.object({
  instanceId: z.string(),
})

export type InstanceRequestParamsSchema = z.infer<
  typeof instanceRequestParamsSchema
>
