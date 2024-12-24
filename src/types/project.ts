export type ProjectItemType = {
  id: number
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

export type ProjectFormType = ProjectDetailType
