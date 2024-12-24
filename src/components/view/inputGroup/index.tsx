import type { PropsWithChildren } from 'react'

import { Input, InputBox, TextArea } from './Input'
import { Label, LabelWithoutForm } from './Label'

const Container = ({ children }: PropsWithChildren) => {
  return <div className="flex-column w-full gap-[10px]">{children}</div>
}

export const InputGroup = Object.assign(Container, {
  Input,
  TextArea,
  Label,
  LabelWithoutForm,
  InputBox,
})
