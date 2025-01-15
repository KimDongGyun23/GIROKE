import { createContext, type PropsWithChildren, useContext } from 'react'

import { Input, TextArea } from './Input'
import { Label } from './Label'

export const InputGroupContext = createContext('')
export const useInputGroupContext = () => {
  const context = useContext(InputGroupContext)

  if (!context) {
    throw new Error('InputGroupContext.* 컴포넌트만 사용 가능합니다.')
  }
  return context
}

type ContainerProps = {
  section: string
}

const Container = ({ section, children }: PropsWithChildren<ContainerProps>) => {
  return (
    <InputGroupContext.Provider value={section}>
      <section className="flex-column w-full gap-[10px]">{children}</section>
    </InputGroupContext.Provider>
  )
}

export const InputGroup = Object.assign(Container, {
  Input,
  TextArea,
  Label,
})
