import type { CollectionReference, DocumentData } from 'firebase/firestore'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

import { auth, db } from '@/firebase/firebase'
import type { TermFormType, TermItemType, TermTagsType } from '@/types/term'
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
  if (!userId) throw new Error('유저가 존재하지 않습니다.')

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
