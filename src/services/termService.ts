import { auth } from '@/firebase/firebase'
import * as firebaseUtils from '@/firebase/firebaseUtils'
import type { TermFormType, TermItemType, TermTagsType } from '@/types/term'
import { ERROR_MESSAGE } from '@/utils/constants'

const COLLECTION_NAME = 'terms'

export const fetchTerms = (userId: string, activeTag: TermTagsType) =>
  firebaseUtils.fetchItems<TermItemType>(userId, COLLECTION_NAME, activeTag)

export const createTerm = async (formData: TermFormType) => {
  const userId = auth.currentUser?.uid
  if (!userId) throw new Error(ERROR_MESSAGE.auth)
  return firebaseUtils.createItem(userId, COLLECTION_NAME, formData)
}

export const fetchTermDetail = (userId: string, termId: string) =>
  firebaseUtils.fetchItemDetail<TermItemType>(userId, COLLECTION_NAME, termId)

export const deleteTerm = (userId: string, termId: string) =>
  firebaseUtils.deleteItem(userId, COLLECTION_NAME, termId)

export const toggleTermBookmark = (userId: string, termId: string, currentStatus: boolean) =>
  firebaseUtils.toggleItemBookmark(userId, COLLECTION_NAME, termId, currentStatus)

export const fetchTermData = async (id: string) => {
  const userId = auth.currentUser?.uid
  if (!userId) throw new Error(ERROR_MESSAGE.auth)
  return firebaseUtils.fetchItemDetail<TermItemType>(userId, COLLECTION_NAME, id)
}

export const updateTermData = async (id: string, formData: Omit<TermItemType, 'id'>) => {
  const userId = auth.currentUser?.uid
  if (!userId) throw new Error(ERROR_MESSAGE.auth)
  return firebaseUtils.updateItemData(userId, COLLECTION_NAME, id, formData)
}

export const fetchTermsByTagAndSearch = (userId: string, activeTag: string, searchName: string) =>
  firebaseUtils.searchItems<TermItemType>(userId, COLLECTION_NAME, activeTag, searchName)
