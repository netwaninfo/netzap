import { usePathname } from 'next/navigation'

type SimplePath = `/${string}`

interface UseNestedPathProps {
  path: SimplePath
  base?: SimplePath
}

function useNestedPath({ path, base }: UseNestedPathProps): string {
  const pathname = usePathname()

  const nested = (base ?? pathname).concat(path).replace('//', '/')

  return nested
}

export { useNestedPath }
