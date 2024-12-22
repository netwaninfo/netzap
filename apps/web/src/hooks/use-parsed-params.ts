import { useParams } from 'next/navigation'
import type { ZodSchema, z } from 'zod'
import { fromError } from 'zod-validation-error'

function useParsedParams<T>(schema: ZodSchema<T>): z.output<typeof schema> {
  const params = useParams()

  const parsed = schema.safeParse(params)

  if (!parsed.success) {
    throw new Error(fromError(parsed.error).toString())
  }

  return parsed.data
}

export { useParsedParams }
