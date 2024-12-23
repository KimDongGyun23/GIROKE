import type { NOTE_TAGS } from '@/utils/constants'

export type NoteTagType = (typeof NOTE_TAGS)[number]

export type NoteItemType = {
  id: number
  title: string
  createdAt: string
  tag: NoteTagType
}

type ParagraphType = {
  subTitle: string
  content: string
}

export type NoteFormType = {
  title: string
  tag: NoteTagType
  paragraphs: ParagraphType[]
}
