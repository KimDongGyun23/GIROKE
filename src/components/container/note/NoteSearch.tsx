import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import type { CollectionReference, DocumentData } from 'firebase/firestore'
import { collection, getDocs, query, where } from 'firebase/firestore'

import { NoteItem } from '@/components/domain/NoteItem'
import { BackArrowIcon } from '@/components/view/icons/NonActiveIcon'
import { Search } from '@/components/view/Search'
import { Tag } from '@/components/view/Tag'
import { auth, db } from '@/firebase/firebase'
import type { NoteItemType, NoteTagType } from '@/types/note'
import { NOTE_TAGS } from '@/utils/constants'

export const NoteSearch = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const searchName = searchParams.get('searchName') || ''
  const [activeTag, setActiveTag] = useState<NoteTagType>(NOTE_TAGS[0])
  const [notes, setNotes] = useState<NoteItemType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true)
      try {
        const userId = auth.currentUser?.uid
        if (!userId) {
          console.error('User not authenticated')
          setLoading(false)
          return
        }

        const userNotesRef = collection(db, 'users', userId, 'notes')
        let notesQuery = userNotesRef

        if (activeTag !== '전체') {
          notesQuery = query(userNotesRef, where('tag', '==', activeTag)) as CollectionReference<
            DocumentData,
            DocumentData
          >
        }

        const querySnapshot = await getDocs(notesQuery)
        const fetchedNotes = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }) as NoteItemType)
          .filter((note) => note.title.toLowerCase().includes(searchName.toLowerCase()))

        setNotes(fetchedNotes)
      } catch (error) {
        console.error('Error fetching notes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [activeTag, searchName])

  const handleBackClick = () => navigate('/note')
  const handleTagClick = (tag: NoteTagType) => setActiveTag(tag)

  return (
    <main className="flex-column mx-4 h-full pt-5">
      <header className="flex-align gap-4">
        <button onClick={handleBackClick}>
          <BackArrowIcon />
        </button>
        <div className="grow">
          <Search initialValue={searchName} tabName="note" />
        </div>
      </header>

      <div className="scroll flex w-fit shrink-0 gap-2 overflow-x-scroll py-3">
        {NOTE_TAGS.map((tag) => (
          <Tag key={tag} secondary={activeTag !== tag} onClick={() => handleTagClick(tag)}>
            {tag}
          </Tag>
        ))}
      </div>

      <section className="flex-column scroll grow">
        {loading ? (
          <p>Loading...</p>
        ) : notes.length > 0 ? (
          notes.map((note) => <NoteItem key={note.id} note={note} />)
        ) : (
          <p>No notes found.</p>
        )}
      </section>
    </main>
  )
}
