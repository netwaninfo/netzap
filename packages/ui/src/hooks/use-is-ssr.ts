function isSSR() {
  return typeof window === 'undefined'
}

function useIsSSR() {
  return isSSR()
}

export { useIsSSR, isSSR }
