import type { CollectionReference, DocumentData } from 'firebase/firestore'
import { collection, getDocs, query, where } from 'firebase/firestore'

import { db } from '@/firebase/firebase'
import type { NoteItemType, NoteTagType } from '@/types/note'

export const fetchNotes = async (userId: string, activeTag: NoteTagType) => {
  const userNotesRef = collection(db, 'users', userId, 'notes')
  let notesQuery = userNotesRef

  if (activeTag !== '전체') {
    notesQuery = query(userNotesRef, where('tag', '==', activeTag)) as CollectionReference<
      DocumentData,
      DocumentData
    >
  }

  const querySnapshot = await getDocs(notesQuery)
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as NoteItemType[]
}
