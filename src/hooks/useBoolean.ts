import { useState } from 'react'

type useBooleanType = (initial?: boolean) => [boolean, () => void, () => void]

export const useBoolean: useBooleanType = (initial = false) => {
  const [state, setState] = useState<boolean>(initial)

  const setTrue = () => {
    setState(true)
  }

  const setFalse = () => {
    setState(false)
  }

  return [state, setTrue, setFalse]
}
