import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { ZodSchema, z } from 'zod'
import { useParsedParams } from './use-parsed-params'

// nups

interface UseParamsStateProps<T> {
  schema: ZodSchema<T>
}

type NewParams<T extends ZodSchema> = Partial<z.input<T>>
type NewParamsKey<T extends ZodSchema> = keyof NewParams<T>
type NewParamsValue<T extends ZodSchema> = NewParams<T>[NewParamsKey<T>]

function useParamsState<T>({ schema }: UseParamsStateProps<T>) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParsedParams(schema)
  const searchParams = useSearchParams()

  const setParamsState = useCallback(
    (newParams: NewParams<typeof schema>) => {
      const entries = Object.entries(newParams) as Array<
        [NewParamsKey<typeof schema>, NewParamsValue<typeof schema>]
      >

      const newPath = entries.reduce(
        (path, [key, value]) =>
          path.replace(String(params[key]), String(value)),
        pathname
      )

      router.replace(newPath.concat(`?${searchParams.toString()}`))
    },
    [router, pathname, params, searchParams]
  )

  return [params, setParamsState] as const
}

export { useParamsState }
