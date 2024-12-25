import { useFormContext } from 'react-hook-form'
import type { ZodSchema, z } from 'zod'

import type { UseZodFormReturn } from './use-zod-form'

type UseZodFormContextReturn<Schema extends ZodSchema> =
  UseZodFormReturn<Schema>

function useZodFormContext<
  Schema extends ZodSchema,
>(): UseZodFormContextReturn<Schema> {
  return useFormContext<z.input<Schema>, unknown, z.output<Schema>>()
}

export { useZodFormContext }
