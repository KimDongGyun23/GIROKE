import { useState } from 'react'

type UseToggleType = (initalState?: boolean) => [boolean, () => void]

export const useToggle: UseToggleType = (initalState = false) => {
  const [state, setState] = useState<boolean>(initalState)

  const toggle = () => {
    setState((prevState) => !prevState)
  }

  return [state, toggle]
}
