import * as firebaseUtils from '@/firebase/firebaseUtils'
import type { NotedDetailType, NoteFormType, NoteItemType, NoteTagType } from '@/types/note'

const COLLECTION_NAME = 'notes'

export const fetchNotes = (userId: string, activeTag: NoteTagType) =>
  firebaseUtils.fetchItems<NoteItemType>(userId, COLLECTION_NAME, activeTag)

export const createNote = (userId: string, data: NoteFormType, selectedTag: NoteTagType) =>
  firebaseUtils.createItem(userId, COLLECTION_NAME, { ...data, tag: selectedTag })

export const fetchNoteDetail = (userId: string, noteId: string) =>
  firebaseUtils.fetchItemDetail<NotedDetailType>(userId, COLLECTION_NAME, noteId)

export const deleteNote = (userId: string, noteId: string) =>
  firebaseUtils.deleteItem(userId, COLLECTION_NAME, noteId)

export const toggleNoteBookmark = (userId: string, noteId: string, currentStatus: boolean) =>
  firebaseUtils.toggleItemBookmark(userId, COLLECTION_NAME, noteId, currentStatus)

export const fetchNoteData = (userId: string, noteId: string) =>
  firebaseUtils.fetchItemDetail<NoteFormType>(userId, COLLECTION_NAME, noteId)

export const updateNoteData = (userId: string, noteId: string, formData: NoteFormType) =>
  firebaseUtils.updateItemData(userId, COLLECTION_NAME, noteId, formData)

export const searchNotes = (userId: string, activeTag: NoteTagType, searchName: string) =>
  firebaseUtils.searchItems<NoteItemType>(userId, COLLECTION_NAME, activeTag, searchName)
