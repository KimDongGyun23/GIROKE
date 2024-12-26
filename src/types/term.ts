import type { TERM_TAGS } from '@/utils/constants'

export type TermItemType = {
  id: string
  term: string
  tag: TermTagsType
  createdAt: string
  description: string
  isBookmarked: boolean
}

export type TermFormType = Omit<TermItemType, 'id'>

export type TermTagsType = (typeof TERM_TAGS)[number]
