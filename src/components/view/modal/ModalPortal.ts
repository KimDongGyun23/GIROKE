import type { PropsWithChildren } from 'react'
import ReactDom from 'react-dom'

export const ModalPortal = ({ children }: PropsWithChildren) => {
  const modalRoot = document.getElementById('modal') as HTMLElement

  return ReactDom.createPortal(children, modalRoot)
}
