import type { CollectionReference, DocumentData } from 'firebase/firestore'
import { collection, getDocs, query, where } from 'firebase/firestore'

import { db } from '@/firebase/firebase'
import type { TermItemType, TermTagsType } from '@/types/term'

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
