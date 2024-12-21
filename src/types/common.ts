import type { ComponentType } from 'react'

export type ActiveIconProps = {
  active?: boolean
}

export type PageNavItemsType = {
  name: string
  Component: ComponentType<Required<ActiveIconProps>>
  url: string
}
