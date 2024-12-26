import type { PROJECT_TAGS } from '@/utils/constants'

export type ProjectTagType = (typeof PROJECT_TAGS)[number]

export type ProjectItemType = {
  id: string
  title: string
  satisfaction: number
  description: string
  startDate: string
  finishDate: string
}

export type ProjectDetailType = ProjectItemType & {
  painstakingPart: string
  likingPart: string
  disappointingPart: string
  reasonOfStack: string
}

export type ProjectFormType = Omit<ProjectDetailType, 'id'>
