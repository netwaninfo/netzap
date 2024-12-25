import { useFormContext } from 'react-hook-form'
import { ZodSchema, z } from 'zod'

import { UseZodFormReturn } from './use-zod-form'

type UseZodFormContextReturn<Schema extends ZodSchema> =
  UseZodFormReturn<Schema>

function useZodFormContext<
  Schema extends ZodSchema,
>(): UseZodFormContextReturn<Schema> {
  return useFormContext<z.input<Schema>, unknown, z.output<Schema>>()
}

export { useZodFormContext }
