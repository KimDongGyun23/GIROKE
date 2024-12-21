import type { PropsWithChildren } from 'react'

import { Input, TextArea } from './Input'
import { Label } from './Label'

const Container = ({ children }: PropsWithChildren) => {
  return <div className="flex-column w-full gap-[10px]">{children}</div>
}

export const InputGroup = Object.assign(Container, {
  Input,
  TextArea,
  Label,
})
