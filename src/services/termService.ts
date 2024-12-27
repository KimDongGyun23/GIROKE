import * as firebaseUtils from '@/services/firebaseUtils'
import type { TermFormType, TermItemType, TermTagsType } from '@/types/term'

import {
  useItemBookmark,
  useItemCreate,
  useItemDelete,
  useItemDetail,
  useItemSearch,
  useItemsFetch,
  useItemUpdate,
} from './firebaseHooks'

const COLLECTION_NAME = 'terms'

export const useTerms = (activeTag: TermTagsType) =>
  useItemsFetch<TermItemType, TermTagsType>(
    (userId: string, tag: TermTagsType) =>
      firebaseUtils.fetchItems<TermItemType>(userId, COLLECTION_NAME, tag),
    activeTag,
  )

export const useTermCreate = () =>
  useItemCreate<TermFormType, TermTagsType>(
    (userId: string, data: TermFormType, selectedTag: TermTagsType) =>
      firebaseUtils.createItem(userId, COLLECTION_NAME, { ...data, tag: selectedTag }),
  )

export const useTermDetail = (termId: string | undefined) =>
  useItemDetail<TermItemType>(
    (userId: string, id: string) =>
      firebaseUtils.fetchItemDetail<TermItemType>(userId, COLLECTION_NAME, id),
    termId,
  )

export const useTermDelete = () =>
  useItemDelete((userId: string, id: string) =>
    firebaseUtils.deleteItem(userId, COLLECTION_NAME, id),
  )

export const useTermUpdate = () =>
  useItemUpdate<Omit<TermItemType, 'id'>>(
    (userId: string, id: string, formData: Omit<TermItemType, 'id'>) =>
      firebaseUtils.updateItemData(userId, COLLECTION_NAME, id, formData),
  )

export const useTermSearch = (activeTag: TermTagsType, searchName: string) =>
  useItemSearch<TermItemType, TermTagsType>(
    (userId: string, tag: TermTagsType, name: string) =>
      firebaseUtils.searchItems<TermItemType>(userId, COLLECTION_NAME, tag, name),
    activeTag,
    searchName,
  )

export const useTermBookmark = (termId: string | undefined) =>
  useItemBookmark(
    (userId: string, id: string, currentStatus: boolean) =>
      firebaseUtils.toggleItemBookmark(userId, COLLECTION_NAME, id, currentStatus),
    termId,
  )
