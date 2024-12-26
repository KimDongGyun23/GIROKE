import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'

import { auth, db } from '@/firebase/firebase'
import type { NoteItemType, NoteTagType } from '@/types/note'
import { NOTE_TAGS } from '@/utils/constants'

import { Tag } from '../view/Tag'

import { NoteItem } from './NoteItem'

export const BookmarkNote = () => {
  const [activeTag, setActiveTag] = useState<NoteTagType>(NOTE_TAGS[0])
  const [bookmarkedNotes, setBookmarkedNotes] = useState<NoteItemType[]>([])
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

    const fetchBookmarkedNotes = async () => {
      setLoading(true)
      try {
        const notesRef = collection(db, 'users', userId, 'notes')
        let notesQuery = query(notesRef, where('isBookmarked', '==', true))

        if (activeTag !== '전체') {
          notesQuery = query(notesQuery, where('tag', '==', activeTag))
        }

        const querySnapshot = await getDocs(notesQuery)
        const fetchedNotes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as NoteItemType[]

        setBookmarkedNotes(fetchedNotes)
      } catch (error) {
        console.error('Error fetching bookmarked notes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookmarkedNotes()
  }, [activeTag, userId])

  const handleTagClick = (tag: NoteTagType) => setActiveTag(tag)

  return (
    <>
      <div className="scroll flex w-fit shrink-0 gap-2 overflow-x-scroll py-3">
        {NOTE_TAGS.map((tag) => (
          <Tag key={tag} secondary={activeTag !== tag} onClick={() => handleTagClick(tag)}>
            {tag}
          </Tag>
        ))}
      </div>

      <section className="flex-column scroll">
        {loading ? (
          <p>Loading...</p>
        ) : bookmarkedNotes.length > 0 ? (
          bookmarkedNotes.map((note) => <NoteItem key={note.id} note={note} />)
        ) : (
          <p>No bookmarked notes found.</p>
        )}
      </section>
    </>
  )
}
