import type { CollectionReference, DocumentData } from 'firebase/firestore'
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
import type { NotedDetailType, NoteFormType, NoteItemType, NoteTagType } from '@/types/note'
import { ERROR_MESSAGE } from '@/utils/constants'
import { formatDate } from '@/utils/formatDate'

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

export const createNote = async (userId: string, data: NoteFormType, selectedTag: NoteTagType) => {
  const newNoteId = uuidv4()
  const userNotesRef = collection(db, 'users', userId, 'notes')
  const newNoteDocRef = doc(userNotesRef, newNoteId)

  await setDoc(newNoteDocRef, {
    id: newNoteId,
    tag: selectedTag,
    title: data.title,
    paragraphs: data.paragraphs,
    createdAt: formatDate(new Date(), 'dotted'),
  })

  return newNoteId
}

export const fetchNoteDetail = async (userId: string, noteId: string) => {
  const noteRef = doc(db, 'users', userId, 'notes', noteId)
  const noteSnap = await getDoc(noteRef)
  if (noteSnap.exists()) {
    return { id: noteSnap.id, ...noteSnap.data() } as NotedDetailType
  }
  throw new Error(ERROR_MESSAGE.noData)
}

export const deleteNote = async (userId: string, noteId: string) => {
  const noteRef = doc(db, 'users', userId, 'notes', noteId)
  await deleteDoc(noteRef)
}

export const toggleNoteBookmark = async (
  userId: string,
  noteId: string,
  currentStatus: boolean,
) => {
  const noteRef = doc(db, 'users', userId, 'notes', noteId)
  const newBookmarkStatus = !currentStatus
  await updateDoc(noteRef, { isBookmarked: newBookmarkStatus })
  return newBookmarkStatus
}

export const fetchNoteData = async (userId: string, noteId: string) => {
  const noteRef = doc(db, 'users', userId, 'notes', noteId)
  const noteSnap = await getDoc(noteRef)
  if (noteSnap.exists()) {
    return noteSnap.data() as NoteFormType
  }
  throw new Error(ERROR_MESSAGE.noData)
}

export const updateNoteData = async (userId: string, noteId: string, formData: NoteFormType) => {
  const noteRef = doc(db, 'users', userId, 'notes', noteId)
  await updateDoc(noteRef, formData)
}

export const searchNotes = async (userId: string, activeTag: NoteTagType, searchName: string) => {
  const userNotesRef = collection(db, 'users', userId, 'notes')
  let notesQuery = userNotesRef

  if (activeTag !== '전체') {
    notesQuery = query(userNotesRef, where('tag', '==', activeTag)) as CollectionReference<
      DocumentData,
      DocumentData
    >
  }

  const querySnapshot = await getDocs(notesQuery)
  return querySnapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }) as NoteItemType)
    .filter((note) => note.title.toLowerCase().includes(searchName.toLowerCase()))
}
