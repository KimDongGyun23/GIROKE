import type { DocumentData, Query } from 'firebase/firestore'
import { collection, getDocs, query, where } from 'firebase/firestore'

import { db } from '@/firebase/firebase'
import type { NoteItemType, NoteTagType } from '@/types/note'
import type { TermItemType, TermTagsType } from '@/types/term'

type BookmarkType = 'terms' | 'notes'
type TagType = TermTagsType | NoteTagType
type ItemType = TermItemType | NoteItemType

const createBookmarkQuery = (
  userId: string,
  type: BookmarkType,
  activeTag: TagType,
): Query<DocumentData> => {
  const collectionRef = collection(db, 'users', userId, type)
  let baseQuery = query(collectionRef, where('isBookmarked', '==', true))

  if (activeTag !== '전체') {
    baseQuery = query(baseQuery, where('tag', '==', activeTag))
  }

  return baseQuery
}

const fetchBookmarkedItems = async <T extends ItemType>(
  userId: string,
  type: BookmarkType,
  activeTag: TagType,
): Promise<T[]> => {
  const bookmarkQuery = createBookmarkQuery(userId, type, activeTag)
  const querySnapshot = await getDocs(bookmarkQuery)

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as T[]
}

export const fetchBookmarkedTerms = (userId: string, activeTag: TermTagsType) =>
  fetchBookmarkedItems<TermItemType>(userId, 'terms', activeTag)

export const fetchBookmarkedNotes = (userId: string, activeTag: NoteTagType) =>
  fetchBookmarkedItems<NoteItemType>(userId, 'notes', activeTag)
