import { useEffect, useState } from 'react'

import { auth } from '@/firebase/firebase'
import { useAuthState } from '@/hooks/useAuthState'
import { fetchNotes } from '@/services/noteService'
import type { NoteItemType, NoteTagType } from '@/types/note'

export const useNotes = (activeTag: NoteTagType) => {
  const { userId, loading: authLoading } = useAuthState(auth)
  const [notes, setNotes] = useState<NoteItemType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadNotes = async () => {
      if (authLoading || !userId) return

      setLoading(true)
      try {
        const fetchedNotes = await fetchNotes(userId, activeTag)
        setNotes(fetchedNotes)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error fetching notes'))
      } finally {
        setLoading(false)
      }
    }

    loadNotes()
  }, [authLoading, userId, activeTag])

  return { notes, loading: loading || authLoading, error }
}
