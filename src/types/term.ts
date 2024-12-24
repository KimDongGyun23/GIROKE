import type { TERM_TAGS } from '@/utils/constants'

export type TermItemType = {
  id: number
  term: string
  tag: TermTagsType
  description: string
}

export type TermFormType = {
  name: string
  description: string
  tag: string
}

export type TermTagsType = (typeof TERM_TAGS)[number]
