import type { ComponentType } from 'react'

export type CSSubjectType =
  | '전체'
  | '네트워크'
  | '데이터베이스'
  | '자료구조'
  | '알고리즘'
  | '운영체제'
  | '컴퓨터구조'

export type TermItemType = {
  id: number
  term: string
  tag: CSSubjectType | '전체'
  description: string
}

export type ActiveIconProps = {
  active?: boolean
}

export type PageNavItemsType = {
  name: string
  Component: ComponentType<Required<ActiveIconProps>>
  url: string
}
