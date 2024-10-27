import { z } from 'zod'

import { instanceRequestParamsSchema } from '@/shared/index.js'

export const importFromInstanceParamsSchema = instanceRequestParamsSchema

export type ImportFromInstanceParams = z.infer<
  typeof importFromInstanceParamsSchema
>
