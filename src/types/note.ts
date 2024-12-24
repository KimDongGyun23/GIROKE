import type { NOTE_TAGS } from '@/utils/constants'

export type NoteTagType = (typeof NOTE_TAGS)[number]

export type NoteItemType = {
  id: number
  title: string
  createdAt: string
  tag: NoteTagType
}

export type NotesType = {
  subTitle: string
  content: string
}

export type NoteDetailType = Omit<NoteItemType, 'createdAt'> & {
  notes: NotesType[]
  tag: NoteTagType
}

export type NoteFormType = Omit<NoteDetailType, 'id'>
