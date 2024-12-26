import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import type { CollectionReference, DocumentData } from 'firebase/firestore'
import { collection, getDocs, query, where } from 'firebase/firestore'

import { NoteItem } from '@/components/domain/NoteItem'
import { PostAdditionButton } from '@/components/view/PostAdditionButton'
import { Search } from '@/components/view/Search'
import { Tag } from '@/components/view/Tag'
import { auth, db } from '@/firebase/firebase'
import type { NoteItemType, NoteTagType } from '@/types/note'
import { NOTE_TAGS } from '@/utils/constants'

export const Note = () => {
  const [activeTag, setActiveTag] = useState<NoteTagType>(NOTE_TAGS[0])
  const [notes, setNotes] = useState<NoteItemType[]>([])
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

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

    const fetchNotes = async () => {
      setLoading(true)
      try {
        const userNotesRef = collection(db, 'users', userId, 'notes')
        let notesQuery = userNotesRef

        if (activeTag !== '전체') {
          notesQuery = query(userNotesRef, where('tag', '==', activeTag)) as CollectionReference<
            DocumentData,
            DocumentData
          >
        }

        const querySnapshot = await getDocs(notesQuery)
        const fetchedNotes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as NoteItemType[]
        setNotes(fetchedNotes)
      } catch (error) {
        console.error('Error fetching notes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [activeTag, userId])

  const handleTagClick = (tag: NoteTagType) => setActiveTag(tag)

  return (
    <main className="flex-column mx-4 h-full">
      <Search tabName="note" />

      <div className="scroll flex w-fit shrink-0 gap-2 overflow-x-scroll py-3">
        {NOTE_TAGS.map((tag) => (
          <Tag key={tag} secondary={activeTag !== tag} onClick={() => handleTagClick(tag)}>
            {tag}
          </Tag>
        ))}
      </div>

      <section>
        {loading ? (
          <p>Loading...</p>
        ) : notes.length > 0 ? (
          notes.map((note) => <NoteItem key={note.id} note={note} />)
        ) : (
          <p>No notes found.</p>
        )}
      </section>

      <PostAdditionButton to="/note/create" />
    </main>
  )
}
