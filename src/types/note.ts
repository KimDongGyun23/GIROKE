import type { NOTE_TAGS } from '@/utils/constants'

export type NoteTagType = (typeof NOTE_TAGS)[number]

export type NoteItemType = {
  id: string
  title: string
  createdAt: string
  tag: NoteTagType
  isBookmarked: boolean
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

export type NotedDetailType = {
  id: string
  title: string
  createdAt: string
  tag: NoteTagType
  isBookmarked: boolean
  paragraphs: ParagraphType[]
}
