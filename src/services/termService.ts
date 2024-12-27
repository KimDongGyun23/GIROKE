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

import { auth, db } from '@/firebase/firebase'
import type { TermFormType, TermItemType, TermTagsType } from '@/types/term'
import { ERROR_MESSAGE } from '@/utils/constants'
import { formatDate } from '@/utils/formatDate'

export const fetchTerms = async (
  userId: string,
  activeTag: TermTagsType,
): Promise<TermItemType[]> => {
  const userDocRef = collection(db, 'users', userId, 'terms')
  let termsQuery = userDocRef

  if (activeTag !== '전체') {
    termsQuery = query(
      userDocRef,
      where('tag', '==', activeTag),
    ) as CollectionReference<DocumentData>
  }

  const querySnapshot = await getDocs(termsQuery)
  return querySnapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      term: data.term as string,
      tag: data.tag as TermTagsType,
      createdAt: data.createdAt,
      description: data.description as string,
      isBookmarked: data.isBookmarked,
    }
  })
}

export const createTerm = async (formData: TermFormType) => {
  const userId = auth.currentUser?.uid
  if (!userId) throw new Error(ERROR_MESSAGE.auth)

  const newTermId = uuidv4()
  const userDocRef = doc(db, 'users', userId)
  const termsCollectionRef = collection(userDocRef, 'terms')
  const newTermDocRef = doc(termsCollectionRef, newTermId)

  await setDoc(newTermDocRef, {
    id: newTermId,
    term: formData.term,
    description: formData.description,
    createdAt: formatDate(new Date(), 'dotted'),
    tag: formData.tag,
  })

  return newTermId
}

export const fetchTermDetail = async (userId: string, termId: string) => {
  const termDocRef = doc(db, 'users', userId, 'terms', termId)
  const termDoc = await getDoc(termDocRef)

  if (termDoc.exists()) {
    return { id: termDoc.id, ...termDoc.data() } as TermItemType
  } else {
    throw new Error(ERROR_MESSAGE.noData)
  }
}

export const toggleBookmark = async (termId: string, currentStatus: boolean) => {
  const userId = auth.currentUser?.uid
  if (!userId) throw new Error(ERROR_MESSAGE.auth)

  const termDocRef = doc(db, 'users', userId, 'terms', termId)
  const newBookmarkStatus = !currentStatus

  await updateDoc(termDocRef, { isBookmarked: newBookmarkStatus })

  return newBookmarkStatus
}

export const deleteTerm = async (userId: string, termId: string) => {
  const termDocRef = doc(db, 'users', userId, 'terms', termId)
  await deleteDoc(termDocRef)
}

export const toggleTermBookmark = async (
  userId: string,
  termId: string,
  currentStatus: boolean,
) => {
  const termDocRef = doc(db, 'users', userId, 'terms', termId)
  const newBookmarkStatus = !currentStatus
  await updateDoc(termDocRef, { isBookmarked: newBookmarkStatus })
  return newBookmarkStatus
}

export const fetchTermData = async (id: string) => {
  const userId = auth.currentUser?.uid
  if (!userId) {
    throw new Error(ERROR_MESSAGE.auth)
  }
  const termDocRef = doc(db, 'users', userId, 'terms', id)
  const termDoc = await getDoc(termDocRef)
  if (termDoc.exists()) {
    return termDoc.data() as TermItemType
  } else {
    throw new Error(ERROR_MESSAGE.noData)
  }
}

export const updateTermData = async (id: string, formData: Omit<TermItemType, 'id'>) => {
  const userId = auth.currentUser?.uid
  if (!userId) {
    throw new Error(ERROR_MESSAGE.auth)
  }
  const termDocRef = doc(db, 'users', userId, 'terms', id)
  await updateDoc(termDocRef, formData)
}

export const fetchTermsByTagAndSearch = async (activeTag: string, searchName: string) => {
  const userId = auth.currentUser?.uid
  if (!userId) {
    throw new Error(ERROR_MESSAGE.auth)
  }

  const userTermsRef = collection(db, 'users', userId, 'terms')
  let termQuery = userTermsRef

  if (activeTag !== '전체') {
    termQuery = query(userTermsRef, where('tag', '==', activeTag)) as CollectionReference<
      DocumentData,
      DocumentData
    >
  }

  const querySnapshot = await getDocs(termQuery)
  const fetchedTerms = querySnapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }) as TermItemType)
    .filter((term) => term.term.toLowerCase().includes(searchName.toLowerCase()))

  return fetchedTerms
}
