import { z } from 'zod'

import { instanceRequestParamsSchema } from '@/shared'

export const importFromInstanceParamsSchema = instanceRequestParamsSchema

export type ImportFromInstanceParams = z.infer<
  typeof importFromInstanceParamsSchema
>
