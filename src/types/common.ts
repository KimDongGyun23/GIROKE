import type { ComponentType } from 'react'

export type ActiveIconProps = {
  active?: boolean
}

export type PageNavItemsType = {
  name: string
  Component: ComponentType<Required<ActiveIconProps>>
  url: string
}

export type LoginFormType = {
  id: string
  password: string
}

export type CalendarValuePiece = Date | null
export type CalendarValue = CalendarValuePiece | [CalendarValuePiece, CalendarValuePiece]
