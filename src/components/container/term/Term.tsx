import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import type { CollectionReference, DocumentData } from 'firebase/firestore'
import { collection, getDocs, query, where } from 'firebase/firestore'

import { TermItem } from '@/components/domain/TermItem'
import { PostAdditionButton } from '@/components/view/PostAdditionButton'
import { Search } from '@/components/view/Search'
import { Tag } from '@/components/view/Tag'
import { auth } from '@/firebase/firebase'
import { db } from '@/firebase/firebase'
import type { TermItemType, TermTagsType } from '@/types/term'
import { TERM_TAGS } from '@/utils/constants'

export const Term = () => {
  const [activeTag, setActiveTag] = useState<TermTagsType>(TERM_TAGS[0])
  const [terms, setTerms] = useState<TermItemType[]>([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid)
      } else {
        setUserId(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (!userId) return

    const fetchTerms = async () => {
      setLoading(true)
      try {
        const userDocRef = collection(db, 'users', userId, 'terms')
        let termsQuery = userDocRef
        if (activeTag !== '전체') {
          termsQuery = query(
            userDocRef,
            where('tag', '==', activeTag),
          ) as CollectionReference<DocumentData>
        }

        const querySnapshot = await getDocs(termsQuery)
        const fetchedTerms = querySnapshot.docs.map((doc) => {
          const data = doc.data()
          return {
            id: doc.id,
            term: data.term as string,
            tag: data.tag as TermTagsType,
            createdAt: data.createdAt,
            description: data.description as string,
          }
        })
        setTerms(fetchedTerms)
      } catch (error) {
        console.error('Error fetching terms: ', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTerms()
  }, [activeTag, userId])

  const handleTagClick = (tag: TermTagsType) => setActiveTag(tag)

  return (
    <main className="flex-column mx-4 h-full">
      <Search tabName="term" />

      <div className="scroll flex w-fit shrink-0 gap-2 overflow-x-scroll py-3">
        {TERM_TAGS.map((tag) => (
          <Tag key={tag} secondary={activeTag !== tag} onClick={() => handleTagClick(tag)}>
            {tag}
          </Tag>
        ))}
      </div>

      <section className="flex-column scroll grow">
        {loading ? (
          <p>Loading...</p>
        ) : terms.length > 0 ? (
          terms.map((term) => <TermItem key={term.id} term={term} />)
        ) : (
          <p>새로운 용어를 등록해주세요.</p>
        )}
      </section>

      <PostAdditionButton to="/term/create" />
    </main>
  )
}
