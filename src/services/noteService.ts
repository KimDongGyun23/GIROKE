import * as firebaseUtils from '@/services/firebaseUtils'
import type { NotedDetailType, NoteFormType, NoteItemType, NoteTagType } from '@/types/note'

import {
  useItemBookmark,
  useItemCreate,
  useItemDelete,
  useItemDetail,
  useItemSearch,
  useItemsFetch,
  useItemUpdate,
} from './firebaseHooks'

const COLLECTION_NAME = 'notes'

export const useNotes = (activeTag: NoteTagType) =>
  useItemsFetch<NoteItemType, NoteTagType>(
    (userId: string, tag: NoteTagType) =>
      firebaseUtils.fetchItems<NoteItemType>(userId, COLLECTION_NAME, tag),
    activeTag,
  )

export const useNoteCreate = () =>
  useItemCreate<NoteFormType, NoteTagType>(
    (userId: string, data: NoteFormType, selectedTag: NoteTagType) =>
      firebaseUtils.createItem(userId, COLLECTION_NAME, { ...data, tag: selectedTag }),
  )

export const useNoteData = (noteId: string | undefined) =>
  useItemDetail<NotedDetailType>(
    (userId: string, id: string) =>
      firebaseUtils.fetchItemDetail<NotedDetailType>(userId, COLLECTION_NAME, id),
    noteId,
  )

export const useNoteDelete = () =>
  useItemDelete((userId: string, id: string) =>
    firebaseUtils.deleteItem(userId, COLLECTION_NAME, id),
  )

export const useNoteEdit = () =>
  useItemUpdate<NoteFormType>((userId: string, id: string, formData: NoteFormType) =>
    firebaseUtils.updateItemData(userId, COLLECTION_NAME, id, formData),
  )

export const useNoteSearch = (activeTag: NoteTagType, searchName: string) =>
  useItemSearch<NoteItemType, NoteTagType>(
    (userId: string, tag: NoteTagType, name: string) =>
      firebaseUtils.searchItems<NoteItemType>(userId, COLLECTION_NAME, tag, name),
    activeTag,
    searchName,
  )

export const useNoteBookmark = (noteId: string | undefined) =>
  useItemBookmark(
    (userId: string, id: string, currentStatus: boolean) =>
      firebaseUtils.toggleItemBookmark(userId, COLLECTION_NAME, id, currentStatus),
    noteId,
  )
