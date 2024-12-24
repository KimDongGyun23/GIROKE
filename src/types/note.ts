import type { NOTE_TAGS } from '@/utils/constants'

export type NoteTagType = (typeof NOTE_TAGS)[number]
export type NoteFormType = {
  title: string
  notes: {
    subTitle: string
    content: string
  }[]
  tag: NoteTagType
}

export type NoteItemType = {
  id: number
  title: string
  createdAt: string
  tag: NoteTagType
}
