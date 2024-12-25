import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import type { ZodSchema, z } from 'zod'

import { useParsedParams } from '@netzap/ui/hooks/use-parsed-params'

type NewParams<T extends ZodSchema> = Partial<z.input<T>>
type NewParamsKey<T extends ZodSchema> = keyof NewParams<T>
type NewParamsValue<T extends ZodSchema> = NewParams<T>[NewParamsKey<T>]

function useParamsState<T>(schema: ZodSchema<T>) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParsedParams(schema)
  const searchParams = useSearchParams()

  const setParams = useCallback(
    (newParams: NewParams<typeof schema>) => {
      const entries = Object.entries(newParams) as Array<
        [NewParamsKey<typeof schema>, NewParamsValue<typeof schema>]
      >

      const basePath = entries.reduce(
        (path, [key, value]) =>
          path.replace(String(params[key]), String(value)),
        pathname
      )

      const hasSearchParams = !!searchParams.size
      const newPath = hasSearchParams
        ? basePath.concat(`?${searchParams.toString()}`)
        : basePath

      router.replace(newPath)
    },
    [router, pathname, params, searchParams]
  )

  return [params, setParams] as const
}

export { useParamsState }
