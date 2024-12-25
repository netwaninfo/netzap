import { ChangeEvent, useCallback, useState } from 'react'

function useControlledInput(defaultValue = '') {
  const [value, setValue] = useState(defaultValue)

  const handleChangeInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value)
    },
    []
  )

  return [value, handleChangeInput] as const
}

export { useControlledInput }
