import type { CollectionReference, DocumentData, Query } from 'firebase/firestore'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

import { db } from '@/firebase/firebase'
import { ERROR_MESSAGE } from '@/utils/constants'
import { formatDate } from '@/utils/formatDate'

export const getCollectionRef = (userId: string, collectionName: string) =>
  collection(db, 'users', userId, collectionName)

export const getDocRef = (userId: string, collectionName: string, docId: string) =>
  doc(db, 'users', userId, collectionName, docId)

export const fetchItems = async <T>(
  userId: string,
  collectionName: string,
  activeTag: string,
  tagField: string = 'tag',
) => {
  const collectionRef = getCollectionRef(userId, collectionName)
  let itemsQuery: CollectionReference<DocumentData> | Query<DocumentData> = collectionRef

  if (activeTag !== '전체') {
    itemsQuery = query(collectionRef, where(tagField, '==', activeTag))
  }

  const querySnapshot = await getDocs(itemsQuery)

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as T[]
}

export const createItem = async <T>(
  userId: string,
  collectionName: string,
  data: T & { id?: string },
) => {
  const newItemId = uuidv4()
  const collectionRef = getCollectionRef(userId, collectionName)
  const newItemDocRef = doc(collectionRef, newItemId)

  await setDoc(newItemDocRef, {
    id: newItemId,
    ...data,
    createdAt: formatDate(new Date(), 'dotted'),
  })

  return newItemId
}

export const fetchItemDetail = async <T>(
  userId: string,
  collectionName: string,
  itemId: string,
) => {
  const itemRef = getDocRef(userId, collectionName, itemId)
  const itemSnap = await getDoc(itemRef)
  if (itemSnap.exists()) {
    return { id: itemSnap.id, ...itemSnap.data() } as T
  }
  throw new Error(ERROR_MESSAGE.noData)
}

export const deleteItem = async (userId: string, collectionName: string, itemId: string) => {
  const itemRef = getDocRef(userId, collectionName, itemId)
  await deleteDoc(itemRef)
}

export const toggleItemBookmark = async (
  userId: string,
  collectionName: string,
  itemId: string,
  currentStatus: boolean,
) => {
  const itemRef = getDocRef(userId, collectionName, itemId)
  const newBookmarkStatus = !currentStatus
  await updateDoc(itemRef, { isBookmarked: newBookmarkStatus })
  return newBookmarkStatus
}

export const updateItemData = async <T>(
  userId: string,
  collectionName: string,
  itemId: string,
  formData: Partial<T>,
) => {
  const itemRef = getDocRef(userId, collectionName, itemId)
  await updateDoc(itemRef, formData)
}

export const searchItems = async <T extends { term: string } | { title: string }>(
  userId: string,
  collectionName: string,
  activeTag: string,
  searchName: string,
  tagField: string = 'tag',
) => {
  const items = await fetchItems<T>(userId, collectionName, activeTag, tagField)
  return items.filter((item) =>
    'term' in item
      ? item.term.toLowerCase().includes(searchName.toLowerCase())
      : item.title.toLowerCase().includes(searchName.toLowerCase()),
  )
}
