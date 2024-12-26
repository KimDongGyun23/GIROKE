import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import type { CollectionReference, DocumentData } from 'firebase/firestore'
import { collection, getDocs, query, where } from 'firebase/firestore'

import { TermItem } from '@/components/domain/TermItem'
import { BackArrowIcon } from '@/components/view/icons/NonActiveIcon'
import { Search } from '@/components/view/Search'
import { Tag } from '@/components/view/Tag'
import { auth, db } from '@/firebase/firebase'
import type { TermItemType, TermTagsType } from '@/types/term'
import { TERM_TAGS } from '@/utils/constants'

export const TermSearch = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const searchName = searchParams.get('searchName') || ''
  const [activeTag, setActiveTag] = useState<TermTagsType>(TERM_TAGS[0])
  const [terms, setTerms] = useState<TermItemType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTerms = async () => {
      setLoading(true)
      try {
        const userId = auth.currentUser?.uid
        if (!userId) {
          console.error('User not authenticated')
          setLoading(false)
          return
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

        setTerms(fetchedTerms)
      } catch (error) {
        console.error('Error fetching terms:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTerms()
  }, [activeTag, searchName])

  const handleBackClick = () => navigate('/term')
  const handleTagClick = (tag: TermTagsType) => setActiveTag(tag)

  return (
    <main className="flex-column mx-4 h-full pt-5">
      <header className="flex-align gap-4">
        <button onClick={handleBackClick}>
          <BackArrowIcon />
        </button>
        <div className="grow">
          <Search initialValue={searchName} tabName="term" />
        </div>
      </header>

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
          <p>No terms found.</p>
        )}
      </section>
    </main>
  )
}
