import { collection, getDocs, query, where } from 'firebase/firestore'

import { db } from '@/firebase/firebase'
import type { NoteItemType, NoteTagType } from '@/types/note'
import type { TermItemType, TermTagsType } from '@/types/term'

export const fetchBookmarkedTerms = async (userId: string, activeTag: TermTagsType) => {
  const termsRef = collection(db, 'users', userId, 'terms')
  let termsQuery = query(termsRef, where('isBookmarked', '==', true))

  if (activeTag !== '전체') {
    termsQuery = query(termsQuery, where('tag', '==', activeTag))
  }

  const querySnapshot = await getDocs(termsQuery)
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as TermItemType[]
}

export const fetchBookmarkedNotes = async (userId: string, activeTag: NoteTagType) => {
  const notesRef = collection(db, 'users', userId, 'notes')
  let notesQuery = query(notesRef, where('isBookmarked', '==', true))

  if (activeTag !== '전체') {
    notesQuery = query(notesQuery, where('tag', '==', activeTag))
  }

  const querySnapshot = await getDocs(notesQuery)
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as NoteItemType[]
}
