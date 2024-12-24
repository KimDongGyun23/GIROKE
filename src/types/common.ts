import type { ComponentType } from 'react'

import type { PROJECT_TAGS } from '@/utils/constants'

export type ProjectTagType = (typeof PROJECT_TAGS)[number]

export type ActiveIconProps = {
  active?: boolean
}

export type PageNavItemsType = {
  name: string
  Component: ComponentType<Required<ActiveIconProps>>
  url: string
}
